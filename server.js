 const express = require('express');
 const app = express();
 const cors = require('cors');
 const {CLIENT_ORIGIN} = require('./config/config.js');
 const {DB_URL} = require('./config/database');
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

 module.exports = {app};
