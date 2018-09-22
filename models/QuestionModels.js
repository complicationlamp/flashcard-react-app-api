'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const questionModelSchema = mongoose.Schema({
  subject: {type: String, required: true},
  prompt: {type: String, required: true},
  correctAnswer: {type: String, required: true},
  answers: {type: Array, required: true},
  created: {type: Date, default: Date.now},
  link: {},
  // TODO:points to the other collection in the db
  // author: {type:mongoose.Schema.Types.ObjectId, ref:'User' }
}); 

questionModelSchema.methods.serialize = function() {
  return {
    id: this._id,
    subject: this.subject,
    prompt: this.prompt,
    correctAnswer: this.correctAnswer,
    answers: this.answers,
    link: this.link,
  };
};

// ========================NEED TO KNOW=======================================
// mongoose takes model and makes it lowercase and plural (Question=> questions)
// NOTE: must match in mlab caused me some problems
// ========================NEED TO KNOW=======================================
const Questions = mongoose.model('Question', questionModelSchema);

module.exports = { Questions };