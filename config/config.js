'use strict';

module.exports = {
  // Exporting client origin
  'CLIENT_ORIGIN' : 'https://obscure-retreat-46503.herokuapp.com/home',

// ========================NEED TO KNOW=======================================
// mongoose takes model and makes it lowercase and plural (Question=> questions)
// NOTE: must match in mlab caused me some problems
// ========================NEED TO KNOW=======================================

  'CONFIG_DB' : 'mongodb://complicationlamp:gradschool1@ds227352.mlab.com:27352/flashcard-react-app',
// test db with only one question
  'TEST_DATABASE_URL' : 'mongodb://complicationlamp:gradschool1@ds217351.mlab.com:17351/mongoose-schema'
};