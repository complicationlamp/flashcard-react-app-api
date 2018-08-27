'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const questionModelSchema = mongoose.Schema({
  subject: {type: String, required: true},
  question: {type: String, required: true},
  answer: {type: String, required: true},
  wrongAnsOne: {type: String, required: true},
  wrongAnsTwo: {type: String},
  wrongAnsThree: {type: String}, 
  created: {type: Date, default: Date.now},
  link: {}
});

questionModelSchema.methods.serialize = function() {
  return {
    id: this._id,
    subject: this.subject,
    question: this.question,
    answer: this.answer,
    wrongAnsOne: this.wrongAnsOne,
    wrongAnsTwo: this.wrongAnsTwo,
    wrongAnsThree: this.wrongAnsThree,
    link: this.link,
  };
};
// ========================NEED TO KNOW=======================================
// mongoose takes model and makes it lowercase and plural (Question=> questions)
// NOTE: must match in mlab caused me some problems
// ========================NEED TO KNOW=======================================
const Questions = mongoose.model('Question', questionModelSchema);

module.exports = { Questions };