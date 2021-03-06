 const {User} = require('./users/models');
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const passport = require('passport');
 const jsonParser = bodyParser.json();
 mongoose.Promise = global.Promise;

 const {
   CLIENT_ORIGIN,
  //  CONFIG_DB IS THE MAIN DB
   CONFIG_DB
 } = require('./config/config.js');
 
 const { router: usersRouter } = require('./users');
 const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

 const {
   Questions
 } = require('./models/QuestionModels.js');
 
 app.use(
   cors({
     origin: CLIENT_ORIGIN
   })
 );

 const PORT = process.env.PORT || 8081;

 app.get('/questions', (req, res) => {
   return Questions.find()
     .then(
       function (result) {
         return res.json(result);
       }
     ).catch(function (err) {
     })
 });

 app.post('/questions/personal/', jsonParser, (req, res) => {
   Questions.find({
      '_id': { $in: req.body.ids }
    }, function(err, docs){
        console.log(docs);
    })
    .then(
      function (result) {
        return res.json(result);
      }
    ).catch(function (err) {
      console.log(err);
    })
 });

 app.post('/questions', jsonParser, (req, res) => {
   const requiredFields = ['subject', 'prompt', 'correctAnswer', 'answers'];
   for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`
       return res.status(400).send(message);
     }
   }
   const userId= req.body.userId;
   Questions.create({
    subject: req.body.subject,
    prompt: req.body.prompt,
    correctAnswer: req.body.correctAnswer,
    answers: req.body.answers,
    created: req.body.created,
    link: req.body.link
   }, 

  //  Callback fuction that will add question id's to the user object. This basicly stores who made the questions.
   function(err, question){
    // console.log('QUESTION: ', question);
    //   console.log('QUESTION ID: ', question._id);
      User.findOneAndUpdate({'_id': userId}, { '$push': {'questions': question._id} }, (err, updatedUserObject) => {
        // remove the fat arrow if/when deleting the console.log()
        console.log('updatedUserObject: ', updatedUserObject)
      });
      res.status(201).json(question);
   })

 });

app.delete('/questions/:id', (req, res) => {
   Questions.findByIdAndRemove(req.params.id)
   .then(() => res.status(204).end())
   .catch(err => res.status(500).json({message: 'Internal server error'}));
 });

 passport.use(localStrategy);
 passport.use(jwtStrategy);
 
 app.use('/users/', usersRouter);
 app.use('/auth/', authRouter);
 
 const jwtAuth = passport.authenticate('jwt', { session: false });
 
 // A protected endpoint which needs a valid JWT to access it
 app.get('/protected', jwtAuth, (req, res) => {
   return res.json({
     data: 'rosebud'
   });
 });
 
 app.use('*', (req, res) => {
   return res.status(404).json({ message: 'Not Found' });
 });

 let server;

 function runServer(CONFIG_DB, port=PORT) {
   return new Promise((resolve, reject) => {
     mongoose.connect(CONFIG_DB, err => {
       if (err) {
         return reject(err);
       }
       server = app.listen(port, () => {
          //  console.log(`Your app is listening on port ${port}`);
           resolve();
         })
         .on('error', err => {
           mongoose.disconnect();
           reject(err);
         });
     });
   });
 }
 // this function closes the server, and returns a promise.
 function closeServer() {
   return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       server.close(err => {
         if (err) {
           return reject(err);
         }
         resolve();
       });
     });
   });
 }
 // if server.js is called directly (aka, with `node server.js`), this block
 // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
 if (require.main === module) {
   runServer(CONFIG_DB).catch(err => console.error(err));
 }

 module.exports = {
   app,
   runServer,
   closeServer
 };