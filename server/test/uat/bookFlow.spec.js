'use strict';
/*
* test cases:
* correct input - what happens?
* correct input but no hit on backend - what happens?
* missing input - what happens?
* incorrect input - what happens?
* */



let ENV = process.env.NODE_ENV
let mongoose = require('mongoose');
let expect = require('chai').expect;
let _ = require('lodash');
let request = require('supertest');
let config = require('../../config.js');
let app = require('../../appWithTests').app;
let PreSnippet = require('../../src/classes/PreSnippet');
let testDatasets = '/Users/bscherm/SideProjects/book_scripter/server/test/dataSets';
let async = require('async');
const MONGO_DB_URL = config.db.mongodb[ENV];
const logger = require('../../../dopeAssHelpers').logger

describe(`No uploaded book first`, () => {
  before((done) => {
    console.log('Opening connection to MongoDB...');
    mongoose.connect(MONGO_DB_URL);
    done();
  });
  beforeEach((done) => {
    mongoose.connection.collections['books'].drop(function(err) {
      done();
    });
  });

  after((done) => {
    mongoose.connection.collections['books'].drop( function(err) {
      console.log('books collection wiped');
      mongoose.connection.close();
      console.log('...Connection to MongoDB closed');
      done();
    });
  })
})

describe(`Uploaded book first`, () => {
  before((done) => {
    console.log('Opening connection to MongoDB...');
    mongoose.connect(MONGO_DB_URL);
    done();
  });

  describe(`No uploaded book first`, () => {
    beforeEach((done) => {
      mongoose.connection.collections['books'].drop(() => done());
    });
    it('GET - /api/books/ - With no books uploaded yet, GET /api/books returns empty array', (done) => {
      // for some reason the beforEach doesn't remove the book before it gets to this
      // but this works
      mongoose.connection.collections['books'].drop(() => {
        request(app)
          .get(`/api/books`)
          .expect({bookNames: []}, done)
      });

    });
  })

  describe(`Book uploaded first`, () => {
    beforeEach((done) => {
      mongoose.connection.collections['books'].drop(function(err) {
        uploadBook(done, 'got_piece')
      });
    });

    it(`POST - /api/books/ - Uploads book and sends back startWorkWith having used default values for splitting the book`, function (done) {
      let defaultExpectedResponse = {
        bookName: 'testBook', // this isn't a default name, but the rest are
        lastBlockIndexWorkedOn: 0,
        characterProfiles: [],
        currentBlockWorkingOn: {
          blockId: 0,
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

    /* the verbs might go into their own collection later*/
    it(`POST - /api/books/verbs`, function (done) {
      async.series([
        function(cb) { addVerbSpokeSynonym(cb, 'yodaleyeehooed') },
      ], done);
    });

    /* the verbs might go into their own collection later*/
    it(`GET - /api/books/info - GET all info about book by bookName & filtered preSnippets`, function (done) {
      async.series([
        function(cb) { getBookInfo(cb) },
      ], done);
    });

    it(`GET - /api/books/verbs - receive an empty array if none to get`, function (done) {
      async.series([
        function(cb) { getVerbSpokeSynonyms(cb) },
      ], done);
    });

    it(`MIX - /api/books/verbs - receive an array of strings of the verbs if custom VSS have been added`, function (done) {
      async.series([
        function(cb) { getVerbSpokeSynonyms(cb) }, // verify no verbs exist
        function(cb) { addVerbSpokeSynonym(cb, 'yodaleyeehooed') }, // add this one
        function(cb) { getVerbSpokeSynonyms(cb, 'yodaleyeehooed') }, // verify this one exists now
      ], done);
    });

    describe('/api/books/characters', () => {
      it(`POST - /api/books/characters - can add a characterProfile and get back the newly updated list`, function (done) {
        async.series([
          function(cb) { addCharacterProfile(cb, 'Bob', []) },
        ], done);
      });

      it(`POST - /api/books/characters/edit - can modify a character's display name`, function (done) {
        let currentCharacterProfile = {displayName: 'Bob', aliases: [], id: 0}
        let newCharacterProfile = {displayName: 'Bobby', aliases: [], id: 0}
        async.series([
          function(cb) { addCharacterProfile(cb, 'Bob', []) },
          function(cb) { modifyCharacterProfile(cb, currentCharacterProfile, newCharacterProfile) },
        ], done);
      });

      it(`POST - /api/books/characters/edit - can modify a character's aliases`, function (done) {
        let currentCharacterProfile = {displayName: 'Bob', aliases: [], id: 0}
        let newCharacterProfile = {displayName: 'Bob', aliases: ['Ro Sham Bo', 'Big Bob'], id: 0}
        expect(false).to.equal(true)
        // async.series([
        //   function(cb) { addCharacterProfile(cb, 'Bob', []) },
        //   function(cb) { modifyCharacterProfile(cb, currentCharacterProfile, newCharacterProfile) },
        // ], done);
      });

      it(`POST - /api/books/characters/edit - can modify a character's display name and aliases`, function (done) {
        let currentCharacterProfile = {displayName: 'Bob', aliases: []}
        let newCharacterProfile = {displayName: 'Bob Lassinger', aliases: ['Big Bobby', 'Bambino']}
        expect(false).to.equal(true)
        // async.series([
        //   function(cb) { addCharacterProfile(cb, 'Bob', []) },
        //   function(cb) { modifyCharacterProfile(cb, currentCharacterProfile, newCharacterProfile) },
        // ], done);
      });

      it(`POST - /api/books/characters/edit - sends error if changing a name results in `, function (done) {
        let currentCharacterProfile = {displayName: 'Bob', aliases: []}
        let newCharacterProfile = {displayName: 'Bob Lassinger', aliases: ['Big Bobby', 'Bambino']}
        expect(false).to.equal(true)
        // async.series([
        //   function(cb) { addCharacterProfile(cb, 'Bob', []) },
        //   function(cb) { modifyCharacterProfile(cb, currentCharacterProfile, newCharacterProfile) },
        // ], done);
      });
    })



    it(`GET - /api/books/suggestion - receive an EMPTY array when no characterProfiles match for suggestion`, function (done) {
      async.series([
        function(cb) { requestSuggestion(cb, undefined) },
      ], done);
    });

    it(`GET - /api/books/suggestion - receive an OCCUPIED array of characterProfile(s) when there's a match on an 'alias'`, function (done) {
      async.series([
        function(cb) { addCharacterProfile(cb, 'Holliday Inn', ['Bob']) },
        function(cb) { requestSuggestion(cb, 'Bob') },
      ], done);
    });

    it(`GET - /api/books/suggestion - receive an OCCUPIED array of characterProfile(s) when there's a match on a 'displayName'`, function (done) {
      async.series([
        function(cb) { addCharacterProfile(cb, 'Bob', ['blahblah']) },
        function(cb) { requestSuggestion(cb, 'Bob') },
      ], done);
    });

    it(`POST - /api/books/multi/nameConfirmedOnPreSnippet - receive the new snippets, after confirming a given preSnippet`, function (done) {
      async.series([
        function(cb) { addCharacterProfile(cb, 'Bob', []) },
        function(cb) { nameConfirmedOnPreSnippet(cb) },
      ], done);
    });

    it(`GET - /api/books/block - receive block data for an existing block`, function (done) {
      let expectedPreSnippetLength = 7;
      let expectedSnippetLength = 0;
      let expectedStatus = 'in progress';
      async.series([
        function(cb) { getBlockById(cb, 0, expectedPreSnippetLength, expectedSnippetLength, expectedStatus) },
      ], done);
    });

    it(`GET - /api/books/block - receive block data for an existing block`, function (done) {
      async.series([
        function(cb) { getBlockById(cb, 1, null, null, null) },
      ], done);
    });

    it(`POST - /api/books/block/next - block to be completed exists, but no more`, function (done) {
      markBlockAsFinishedAndGetNext(done, 0, 'got_piece', (err, res) => {
        expect(res.body.nextBlock).to.equal(null)
        expect(res.body.statusOfBlockIdSent).to.equal('completed')
      })
    });

    it(`POST - /api/books/block/next - block to be completed exists, and next block exists too`, function (done) {
      async.series([
        function(cb) { uploadBook(cb, 'biggerTestBook') },
        function (cb) {
          let thisBlockId = 0
          markBlockAsFinishedAndGetNext(cb, thisBlockId, 'biggerTestBook', (err, res) => {
            expect(res.body.nextBlock.status).to.equal('in progress')
            expect(res.body.nextBlock.preSnippets).to.be.length.above(0)

            // having the block id here should be built in and not added last minute like this
            expect(res.body.nextBlock.blockId).to.equal(thisBlockId + 1)
            expect(res.body.nextBlock.snippets).to.have.lengthOf(0)
            expect(res.body.statusOfBlockIdSent).to.equal('completed')
          })
        }
      ], done);
    });
  })


  after((done) => {
    mongoose.connection.collections['books'].drop( function(err) {
      console.log('books collection wiped');
      mongoose.connection.close();
      console.log('...Connection to MongoDB closed');
      done();
    });
  })
});//end UAT test


function markBlockAsFinishedAndGetNext(cb, blockId, bookName, expectFnSync) {
  return request(app)
    .post('/api/books/block/next')
    .send({ bookName, blockId})
    .expect(200)
    .end((err, res) => {
      expectFnSync(err, res)
      cb()
    })
}



function uploadBook(cb, fileName) {
  cb = cb || function () {};
  return request(app)
    .post('/api/books/')
    .attach('file', `${testDatasets}/${fileName}.txt`)
    .send()
    .end((err, res) => {
      expect(res.body).to.include.keys([
        'bookName', 'characterProfiles', 'lastBlockIndexWorkedOn', 'currentBlockWorkingOn', 'blockStatuses'
      ])
      cb()
    })
}

function addCharacterProfile (cb, displayName, aliases) {
  cb = cb || function () {};
  return request(app)
    .post('/api/books/characters')
    .send({
      bookName: 'got_piece',
      characterProfileToAdd: { displayName, aliases }
    })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      // Note this only works with one char prof in response
      expect(res.body.upToDateCharacterProfiles[0]).to.include.keys('_id');
      expect(res.body.upToDateCharacterProfiles[0].displayName).to.equal(displayName);
      expect(res.body.upToDateCharacterProfiles[0].aliases.length).to.equal(aliases.length);
      cb();
    });
}


function requestSuggestion(cb, nameToMatch) {
  cb = cb || function () {};
  return request(app)
    .get('/api/books/suggestion')
    .query({
      'bookName': 'got_piece', // this book because of the book uploadedBookPromise uses
      'blockId': 0,
      'speechPreSnippetIdSelected': 2 // because 'Bob' is on that one
    })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      if (nameToMatch) {
        let allCharNames = res.body.characterProfilesSuggested.reduce((allCharNames, charProf) => {
          return allCharNames.concat([charProf.displayName]).concat(charProf.aliases)
        }, [])
        expect(allCharNames.includes(nameToMatch)).to.equal(true)
      }
      else {
        expect(res.body.characterProfilesSuggested.length).to.equal(0)
      }

      cb();
    });
}

function addVerbSpokeSynonym(cb, verbToAdd) {
  cb = cb || function () {};
  return request(app)
      .post('/api/books/verbs')
      .send({
        bookName: 'got_piece',
        verbSpokeSynonymToAdd: verbToAdd
      })
      .expect(200)
      .end((err, res) => {
        expect(!!res.body.verbSpokeSynonymAddingResult).to.equal(true);
        cb();
      });
}

function getVerbSpokeSynonyms(cb, verbToMatch) {
  cb = cb || function () {};
  return request(app)
      .get('/api/books/verbs')
      .query({bookName: 'got_piece'})
      .expect(200)
      .end((err, res) => {
        if (_.isUndefined(verbToMatch)) {
          expect(res.body.verbSpokeSynonyms).to.have.length(0);
        }
        else {
          expect(res.body.verbSpokeSynonyms[0]).to.equal(verbToMatch);
        }
        cb();
      });
}

function getBookInfo (cb) {
  cb = cb || function () {};
  return request(app)
    .get('/api/books/info')
    .query({bookName: 'got_piece'})
    .expect(200)
    .end((err, res) => {
      let book = res.body;
      expect(book.bookName).to.equal('got_piece');
      expect(book.characterProfiles.length).to.equal(0);
      book.currentBlockWorkingOn.preSnippets.forEach(ps => {
        expect(ps).to.have.keys(['text', 'type', 'id'])
      })
      cb()
    })
}

/* returns just the new snippet list */
function nameConfirmedOnPreSnippet (cb) {
  cb = cb || function () {};
  return request(app)
    .post('/api/books/multi/nameConfirmedOnPreSnippet')
    .send({
      bookName: 'got_piece',
      blockId: 0,
      preSnippetId: 0,
      displayName: 'Bob',
      snippetType: 'speech'
    })
    .expect(200)
    .end((err, res) => {
      let updatedSnippets = res.body
      expect(updatedSnippets.length).to.equal(1)
      cb()
    })
}

/* returns just the new snippet list */
function getBlockById (cb, blockId, expectedLengthPreSnippets, expectedLengthSnippets, expectedStatus) {
  cb = cb || function () {};
  return request(app)
    .get('/api/books/block')
    .query({ bookName: 'got_piece', blockId})
    .expect(200)
    .end((err, res) => {
      let block = res.body
      if (expectedLengthPreSnippets || expectedLengthSnippets || expectedStatus) {
        expect(block.preSnippets.length).to.equal(expectedLengthPreSnippets)
        expect(block.snippets.length).to.equal(expectedLengthSnippets)
        expect(block.status).to.equal(expectedStatus)
      }
      else {
        expect(block).to.deep.equal({
          preSnippets: [],
          snippets: [],
          status: 'non-existent'
        })
      }
      cb()
    })
}

function modifyCharacterProfile(cb, oldCharProfile, newCharProfile) {
  cb = cb || function () {};
  return request(app)
    .post('/api/books/characters/edit')
    .send({ bookName: 'got_piece', oldCharProfile, newCharProfile })
    .expect(200)
    .end((err, res) => {
      console.log('res.body UAT place', res.body);
      cb()
    })
}






