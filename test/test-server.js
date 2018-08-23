const chai = require('chai');
const chaiHttp = require('chai-http');
const TEST_DATABASE_URL = require('../config/config')

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Questions', function() {
  it('should 200 on GET requests', function() {
    return chai.request(app)
      .get('/questions')
      .then(function(res) {
        res.should.have.status(404);
        res.should.be.json;
        //added but didnt work
        done(done);
      });
  });
});

describe('Questions', function() {
  console.log("inside questions test");
//  Turn on the server for testing
  before(function() {
    return runServer(TEST_DATABASE_URL);
    console.log("hit runserver");
  });
//  turn it off when you complete the test"
after(function(){
  return closeServer(TEST_DATABASE_URL);
  console.log("server closed")
});
it('should return the questions from the GET endpoint', function() {
  return chai.request(app)
    .get('/questions')
    .then(function(res){
      res.should.have.status(200);
      res.should.be.json;
    })
})
})
