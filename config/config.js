'use strict';
require('dotenv').config();

module.exports = {
  // Exporting client origin
  'CLIENT_ORIGIN' : process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  'CONFIG_DB' : 'mongodb://complicationlamp:gradschool1@ds227352.mlab.com:27352/flashcard-react-app',
// test db with only one question
  'TEST_DATABASE_URL' : 'mongodb://complicationlamp:gradschool1@ds231242.mlab.com:31242/flashcard-react-app-test',
  'JWT_SECRET' : process.env.JWT_SECRET,
  'JWT_EXPIRY' : process.env.JWT_EXPIRY || '7d'
};