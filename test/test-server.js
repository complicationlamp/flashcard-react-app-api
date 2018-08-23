const chai = require('chai');
 const chaiHttp = require('chai-http');

 const {app, runServer, closeServer} = require('../server');

 const should = chai.should();
 chai.use(chaiHttp);

 describe('API', function() {
   it('should 200 on GET requests', function() {
     return chai.request(app)
       .get('questions')
       .then(function(res) {
         res.should.have.status(200);
         res.should.be.json;
       });
   });
 });

 describe('Questions', function() {
   console.log("inside questions test");
  //  Turn on the server for testing
   before(function() {
     return runServer();
     console.log("hit runserver");
   });
  //  turn it off when you complete the test"
  after(function(){
    return closeServer();
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
