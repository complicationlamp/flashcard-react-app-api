const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const {
  Questions
} = require('../models/QuestionModels');
const {
  TEST_DATABASE_URL
} = require('../config/config')
const {
  app,
  runServer,
  closeServer
} = require('../server');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('My App', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
    console.log("hit runserver");
  });
  //  turn it off when you complete the test"
  after(function () {
    return closeServer(TEST_DATABASE_URL);
    console.log("server closed")
  });

  // ==========================ENDPOINT TESTS=====================

  describe('QUESTION: GET ENDPOINT', function () {
    it('should return the questions from the GET endpoint', function () {
      return chai.request(app)
        .get('/questions')
        .then(function (res) {
          res.should.have.status(200);
          res.should.be.json;
        })
    })
    it('should 200 on GET requests', function () {
      return chai.request(app)
        .get('/questions')
        .then(function (res) {
          // console.log();
          res.should.have.status(200);
          res.should.be.json;
        });
    });
  });
  describe('QUESTION:POST Endpoint', function () {
    it('should add a new question to the DB', function () {
      const newQuestionTest = {
        subject: faker.random.word(),
        question: faker.lorem.sentence(),
        answer: faker.random.word(),
        wrongAnsOne: faker.random.word(),
        wrongAnsTwo: faker.random.words(),
        wrongAnsThree: faker.random.words(),
        link: faker.internet.url()
      };
      return chai.request(app)
        .post('/questions')
        .send(newQuestionTest)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          (res.body).should.include.keys(
            'subject', 'question', 'answer', 'wrongAnsOne',
            'wrongAnsTwo', 'wrongAnsThree', 'link');
          // console.log(res.body);
        });
    });
  });
  describe('QUESTION:DELETE ENDPOINT', function () {
    it.only('should delete a question from the db', function () {
      let questionToDelete;
      return Questions
        .findOne()
        .then(function (_questions) {
          questions = _questions;
          // console.log(_questions);
          return chai.request(app).delete(`/questions/${questions.id}`);
        })
        .then(function (res) {
          res.should.have.status(204);
          return Questions.findById(questions.id);
        })
        .then(function (_questions) {
          // console.log(_questions);
          expect(_questions).to.be.null;
        });
    })
  })
})