'use strict';
// let request = require('supertest');
// let agent = request.agent();
let mongoose = require('mongoose');
let host = 'http://localhost:3000'; // local development URL
let request = require('supertest-as-promised');
// let testAgent = supertest.agent(host);
// let chai = require('chai');
// chai.use(function (_chai, _) {
//   _chai.Assertion.addMethod('withMessage', function (msg) {
//     _.flag(this, 'message', msg);
//   });
// });
// let expect = chai.expect;
let config = require('../../config.js');
process.env.MONGO_DB = config.db.mongodb.acceptanceTests;
console.log('process.env.MONGO_DB', process.env.MONGO_DB);
let app = require('../../appWithTests').app;

// let config = require('../config.js');

const finish = (done) => {
  return (err, res) => {
    if (err) { return done(err); }
    done();
  };
};

const testy = (done) => {
  // should be starting with a fresh db

};

describe(`UAT test`, () => {
  before((done) => {
    console.log('Opening connection to MongoDB...');
    mongoose.connect(process.env.MONGO_DB);
    done();
  });

  beforeEach((done) => {
    mongoose.connection.collections['books'].drop(function(err) {
      console.log('before each books collection wiped');
      done();
    });
  });

  it('Whole book flow', (done) => {
    request(app)
    .get(`/api/books`)
    .expect({bookNames: []})
    .then(() => {
      console.log('here!!!!!!');
      return request(app)
        .post('/api/books/')
        .field('bookName', 'myBook')
        .attach('file', '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets/testBook.txt')
        .send()
        .expect(201)
        .expect((res) => {
          return done();
        });
    });
  });

  after((done) => {
    console.log('here');
    mongoose.connection.collections['books'].drop( function(err) {
      console.log('books collection wiped');
      mongoose.connection.close();
      console.log('...Connection to MongoDB closed');
      done();
    });

  })
});//end UAT test

function addBookFromTestFile(req) {
  return

}

