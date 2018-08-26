const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const {
  TEST_DATABASE_URL
} = require('../config/config')

const {
  app,
  runServer,
  closeServer
} = require('../server');

const should = chai.should();
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

  describe('GET ENDPOINT', function () {
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
          console.log("strung");
          res.should.have.status(200);
          res.should.be.json;
          //added but didnt work
        });
    });
  });
  describe('POST Endpoint', function() {
    it('should add a new question to the DB', function () {
      const newQuestionTest = {

      }
    })
  })
})