'use strict';
let mongoose = require('mongoose');
let host = 'http://localhost:3000'; // local development URL
let request = require('supertest-as-promised');
let config = require('../../config.js');
process.env.MONGO_DB = config.db.mongodb.acceptanceTests;
let app = require('../../appWithTests').app;


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

  it('With no books uploaded yet, GET /api/books returns empty array', (done) => {
    request(app)
      .get(`/api/books`)
      .expect({bookNames: []}, done)
  });
  
  it(`Uploaded book text file with no json key bookName uses name from the file without extension`, function (done) {
    request(app)
      .post('/api/books/')
      .attach('file', '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets/testBook.txt')
      .send()
      .expect({bookName: 'testBook'}, done)
  });

  it(`Uploaded book text file with no json key bookName uses name from the file even if it has no extension or json 'bookName' key`, function (done) {
    request(app)
    .post('/api/books/')
    .attach('file', '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets/testBook')
    .send()
    .expect({bookName: 'testBook'}, done)
  });

  // it(`Uploaded book text file json key 'bookName' uses that value instead of the file name`, function (done) {
  //   request(app)
  //   .post('/api/books/')
  //   .field('bookName', 'charlie')
  //   .attach('file', '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets/testBook.txt')
  //   .send()
  //   .expect({bookName: 'charlie'}, done)
  // });

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
