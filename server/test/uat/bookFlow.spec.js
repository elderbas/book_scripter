'use strict';
let mongoose = require('mongoose');
let expect = require('chai').expect;
// let host = 'http://localhost:3000'; // local development URL
let request = require('supertest');
// let request = require('superagent');
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
    async.series([
      function(cb) { uploadBook(cb) },
      function(cb) { addCharacterProfile(cb) },
    ], done);
  });

  it(`POST - /api/books/suggestion - receive an EMPTY array when no characterProfiles match for suggestion`, function (done) {
    async.series([
      function(cb) { uploadBook(cb) },
      function(cb) { requestSuggestion(cb) },
    ], done);
  });

  it(`POST - /api/books/suggestion - receive an OCCUPIED array of characterProfile(s) when there's a match `, function (done) {
    let characterProfilesToExpect = [
      {displayName: 'Bob', aliases: []}
    ];
    async.series([
      function(cb) { uploadBook(cb) },
      function(cb) { addCharacterProfile(cb) },
      function(cb) { requestSuggestion(cb, characterProfilesToExpect) },
    ], done);
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


function uploadBook(cb) {
  cb = cb || function () {};
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
    .expect(expectedResponse, cb);
}

function addCharacterProfile (cb) {
  cb = cb || function () {};
  return request(app)
    .post('/api/books/characters')
    .send({
      bookName: 'got_piece',
      characterProfileToAdd: {
        displayName: 'Bob',
        aliases: []
      }
    })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      // Note this only works with one char prof in response
      expect(res.body.upToDateCharacterProfiles[0]).to.include.keys('_id');
      expect(res.body.upToDateCharacterProfiles[0].displayName).to.equal('Bob');
      expect(res.body.upToDateCharacterProfiles[0].aliases.length).to.equal(0);
      cb();
    });
}


function requestSuggestion(cb, characterProfilesMatched) {
  cb = cb || function () {};
  characterProfilesMatched = characterProfilesMatched || [];
  return request(app)
    .get('/api/books/suggestion')
    .query({
      'bookName': 'got_piece', // this book because of the book uploadedBookPromise uses
      'blockId': 0,
      'speechPreSnippetIdSelected': 4
    })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      if (characterProfilesMatched.length === 0) {
        expect(res.body.characterProfilesSuggested).to.deep.equal([]);
      }
      else if (characterProfilesMatched.length > 0) {
        let cPS = res.body.characterProfilesSuggested;
        expect(cPS[0]).to.include.keys('_id', 'displayName', 'aliases');
        expect(cPS[0].displayName).to.equal(characterProfilesMatched[0].displayName);
        expect(cPS[0].aliases).to.deep.equal(characterProfilesMatched[0].aliases);
      }
      cb();
    });
}








