'use strict';
let mongoose = require('mongoose');
// let host = 'http://localhost:3000'; // local development URL
let request = require('supertest-as-promised');
let config = require('../../config.js');
process.env.MONGO_DB = config.db.mongodb.acceptanceTests;
let app = require('../../appWithTests').app;
let PreSnippet = require('../../src/classes/PreSnippet');
let testDatasets = '/Users/bscherm/SideProjects/book_scripter_foundation/server/test/dataSets';
let async = require('async');


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
      .attach('file', `${testDatasets}/testBook.txt`)
      .send()
      .expect(defaultExpectedResponse, done)
  });

  it(`POST - /api/books/characters - can add a characterProfile and get back the newly updated list`, function (done) {
    // http://stackoverflow.com/questions/21089842/how-to-chain-http-calls-with-superagent-supertest
    async.series([
      function(cb) { uploadBook() },
      function(cb) { request(app).get('/new').expect(200, cb); },
      function(cb) { request(app).post('/').send({prop1: 'new'}).expect(404, cb); },
      function(cb) { request(app).get('/0').expect(200, cb); },
      function(cb) { request(app).get('/0/edit').expect(404, cb); },
      function(cb) { request(app).put('/0').send({prop1: 'new value'}).expect(404, cb); },
      function(cb) { request(app).delete('/0').expect(404, cb); },
    ], done);
    let uploadedBookPromise = uploadBook();
    uploadedBookPromise
    .then((req) => {
      return request(app)
        .post('/api/books/characters')
        .send({
          displayName: 'Bob',
          aliases: []
        })
        .expect({updatedCharacterProfiles: [ {displayName: 'Bob', aliases: []} ] })
    })
    .expect({a: 1}, done)
  });

  //
  // it(`POST - /api/books/suggestion returns empty array for no given suggestions`, function (done) {
  //   let uploadedBookPromise = uploadBook();
  //   uploadedBookPromise
  //     .then((req) => {
  //       request(app)
  //         .get('/api/books/suggestion')
  //         .query({
  //           'bookName': 'got_piece', // this book because of the book uploadedBookPromise uses
  //           'blockId': 0,
  //           'speechPreSnippetIdSelected': 4
  //         })
  //         .expect({characterProfilesSuggested: []})
  //         .end(function(err, res) {
  //           if (err) throw err;
  //           done();
  //         });
  //     });
  // });

  // it(`POST - /api/books/suggestion returns characterProfiles of names previously confirmed and with verbs already said to be 'verb spoke synonym' types`, function (done) {
  //   let uploadedBookPromise = uploadBook();
  //   uploadedBookPromise
  //   .then((req) => {
  //     return addCharacterProfile();
  //   });
  // });

  after((done) => {
    mongoose.connection.collections['books'].drop( function(err) {
      console.log('books collection wiped');
      mongoose.connection.close();
      console.log('...Connection to MongoDB closed');
      done();
    });
  })
});//end UAT test


function uploadBook(cbOptions) {
  cbOptions = cbOptions || function () {};
  let expectedResponse = {
    bookName: 'got_piece',
    lastBlockIndexWorkedOn: 0,
    characterProfiles: [],
    currentBlockWorkingOn: {
      status: 'in progress',
      snippets: [],
      preSnippets: [
        new PreSnippet('Chapter 1', 'narration', 0),
        new PreSnippet('\n\n', 'whitespace', 1),
        new PreSnippet('“ABC”', 'speech', 2),
        new PreSnippet(' ', 'whitespace', 3),
        new PreSnippet('Bob said.', 'narration', 4),
        new PreSnippet(' ', 'whitespace', 5),
        new PreSnippet('“DEF”', 'speech', 6),
      ],
    },
    blockStatuses: ['in progress']
  };

  return request(app)
    .post('/api/books/')
    .attach('file', `${testDatasets}/got_piece.txt`)
    .send()
    .expect(expectedResponse)
}

function requestSuggestion() {
  return request(app)
    .get('/api/books/suggestion')
    .query({
      'bookName': 'got_piece', // this book because of the book uploadedBookPromise uses
      'blockId': 0,
      'speechPreSnippetIdSelected': 4
    })
    .expect({characterProfilesSuggested: []})
}

function addCharacterProfile () {
  return request(app)
    .post('/api/books/characters')
    .send({
      displayName: 'Bob',
      aliases: []
    })
    .expect({updatedCharacterProfiles: [ {displayName: 'Bob', aliases: []} ] })
}







