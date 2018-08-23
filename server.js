 const express = require('express');
 const app = express();
 const cors = require('cors');
 const {CLIENT_ORIGIN} = require('./config/config.js');
 const {configDB} = require('./config/database');
//  =================================WED===========================//
 const { Questions } = require('./models/QuestionModels.js');
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

 const PORT = process.env.PORT || 3000;

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

let server;
function runServer(TEST_DATABASE_URL) {

  return new Promise((resolve, reject) => {
    mongoose.connect(TEST_DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
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
  runServer(configDB.url).catch(err => console.error(err));
}

 module.exports = {app, runServer, closeServer};
