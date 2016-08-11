'use strict';
let mongoose = require('mongoose');
// let host = 'http://localhost:3000'; // local development URL
let request = require('supertest-as-promised');
let config = require('../../config.js');
process.env.MONGO_DB = config.db.mongodb.acceptanceTests;
let app = require('../../appWithTests').app;
let PreSnippet = require('../../src/classes/PreSnippet');


describe(`UAT test`, () => {
  before((done) => {
    console.log('Opening connection to MongoDB...');
    mongoose.connect(process.env.MONGO_DB);
    done();
  });

  beforeEach((done) => {
    mongoose.connection.collections['books'].drop(function(err) {
      done();
    });
  });

  it('GET - /api/books/ - With no books uploaded yet, GET /api/books returns empty array', (done) => {
    request(app)
      .get(`/api/books`)
      .expect({bookNames: []}, done)
  });
  
  it(`POST - /api/books/ - Uploads book and sends back startWorkWith having used default values for splitting the book`, function (done) {
    let defaultExpectedResponse = {
      bookName: 'testBook', // this isn't a default name, but the rest are
      lastBlockIndexWorkedOn: 0,
      characterProfiles: [],
      currentBlockWorkingOn: {
        status: 'in progress',
        snippets: [],
        preSnippets: [
          new PreSnippet('Ch1', 'narration', 0),
          new PreSnippet('\n\n', 'whitespace', 1),
          new PreSnippet('A.', 'narration', 2),
          new PreSnippet(' ', 'whitespace', 3),
          new PreSnippet('“B”', 'speech', 4),
          new PreSnippet(' ', 'whitespace', 5),
          new PreSnippet('C.', 'narration', 6),
        ],
      },
      blockStatuses: ['in progress']
    };
    request(app)
      .post('/api/books/')
      .attach('file', '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets/testBook.txt')
      .send()
      .expect(defaultExpectedResponse, done)
  });

  after((done) => {
    mongoose.connection.collections['books'].drop( function(err) {
      console.log('books collection wiped');
      mongoose.connection.close();
      console.log('...Connection to MongoDB closed');
      done();
    });
  })
});//end UAT test
