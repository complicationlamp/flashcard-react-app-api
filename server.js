 const express = require('express');
 const app = express();
 const cors = require('cors');
 const mongoose = require("mongoose");
 const bodyParser = require('body-parser');
 const jsonParser = bodyParser.json();
 const {
   CLIENT_ORIGIN,
   CONFIG_DB
 } = require('./config/config.js');
 //  =================================WED===========================//
 const {
   Questions
 } = require('./models/QuestionModels.js');
 //  =================================WED===========================//

 app.use(
   cors({
     origin: CLIENT_ORIGIN
   })
 );

 // ///////////////////////////////////////BUILD NOTE//////////////////////////////////////
 // TODO:create get endpoints (DO CARDS FIRST) =>>>>> THEN: AS I GO
 // TODO: create tests for each tiny little thing => embody papa roach/Paul Ryan ~ "I'm about to break"
 // ///////////////////////////////////////BUILD NOTE//////////////////////////////////////

 const PORT = process.env.PORT || 8081;

 app.get('/questions', (req, res) => {
   return Questions.find()
     .then(
       function (result) {
         return res.json(result);
       }
     ).catch(function (err) {
       console.log(err);
     })
 });

 app.post('/questions', jsonParser, (req, res) => {
   console.log('inshide post')
   const requiredFields = ['subject', 'question', 'answer', 'wrongAnsOne'];
   for (let i = 0; i < requiredFields.length; i++) {
     const field = requiredFields[i];
     console.log(field)
     if (!(field in req.body)) {
       const message = `Missing \`${field}\` in request body`
       console.error(message);
       return res.status(400).send(message);
     }
   }
   res.status(201).json(req.body);
 })

 let server;

 function runServer(CONFIG_DB) {

   return new Promise((resolve, reject) => {
     mongoose.connect(CONFIG_DB, err => {
       if (err) {
         return reject(err);
       }
       server = app.listen(PORT, () => {
           console.log(`Your app is listening on port ${PORT}`);
           resolve();
         })
         .on('error', err => {
           mongoose.disconnect();
           reject(err);
         });
     });
   });
 }
 // this function closes the server, and returns a promise. we'll
 // use it in our integration tests later.
 function closeServer() {
   return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
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