let expect = require('chai').expect;
let mongoose = require('mongoose');
var config = require('../../config.js');
let Classes = require('../../src/classes/Classes');
let PreSnippet = Classes.PreSnippet;
let CharacterProfile = Classes.CharacterProfile;
let Snippet = Classes.Snippet;

mongoose.Promise = global.Promise;

let Books = require('../../src/dbModels/Books');

describe('<-- Books collection-->\n', () => {
  before((done) => {
    console.log('\n');
    console.log('Opening MongoDB connection via mongoose...');
    mongoose.connect(config.db.mongodb.integrationTest);
    console.log('MongoDB connection OPEN.');
    done();
  });

  describe(`starting with completely FRESH collection -->`, () => {
    beforeEach(function (done) {
      Books.dropModel().then(() => done());
    });

    it(`retrieves empty array if no books are loaded`, (done) => {
      Books.getNamesOfBooksLoaded().then((arrayNames) => {
        expect(arrayNames).to.deep.equal({bookNames: []});
        done();
      });
    });
    

  });//end DESCRIBE ...starting with completely FRESH collection

  //noinspection JSUnresolvedFunction
  describe(`starting with a SINGLE BOOK initialized -->`, (() => {
    const bookNameBeingUsed = 'ASOIAF - Game of Thrones';
    beforeEach((done) => {
      // should result in two Blocks
      let inputTextBlobs = [
        '“Am I?” he asked. “Yes.”',
        'The road was long. “Are we there yet?” John mumbled “Almost there.”'
      ];
      Books.addBook(bookNameBeingUsed, inputTextBlobs).then(addedBook => done());
    });

    afterEach((done) => {
      Books.dropModel().then(() => done());
    });
    it(`getNamesOfBooksLoaded returns array of strings`, function (done) {
      Books.getNamesOfBooksLoaded()
      .then(arrOfNames => {
        expect(arrOfNames).to.deep.equal({bookNames: [bookNameBeingUsed]});
        done();
      }).catch(done);
    });

    it(`retrieves empty array if no characterProfiles have been added`, function (done) {
      Books.getCharacterProfiles(bookNameBeingUsed).then((cPs) => {
        expect(cPs.isMongooseArray && cPs.length === 0).to.be.true;
        done();
      }).catch(done);
    });

    it(`returns the whole characterProfiles after one is added`, function (done) {
      let newCharProf = new CharacterProfile('Garen');
      Books.addCharacterProfile(bookNameBeingUsed, newCharProf).then((cPs) => {
        expect(cPs.characterProfiles[0].displayName).to.equal('Garen');
        expect(cPs.characterProfiles.length).to.equal(1);
        done();
      }).catch(done);
    });

    it(`throws error if trying to add a characterName already existing`, function (done) {
      let newCharProf = new CharacterProfile('Garen');
      Books.addCharacterProfile(bookNameBeingUsed, newCharProf).then((cPsFirst) => {
        expect(cPsFirst.characterProfiles[0].displayName).to.equal('Garen');
        let addCharacterProfilePromise = Books.addCharacterProfile(bookNameBeingUsed, newCharProf);
        addCharacterProfilePromise
          .then(cPsSecond => {})
          .catch((e) => {
            expect(e.message).to.equal('Please add a characterProfile that has a unique displayName');
            done();
          });
      }).catch(done);
    });

    it(`getBlockByIndex`, function (done) {
      Books.getBlockByIndex(bookNameBeingUsed, 0).then(blockDoc => {
        expect(blockDoc).to.have.all.keys(['preSnippets', 'snippets', 'status']);
        done();
      }).catch(done);
    });

    it(`the increment count for pre snippets ids in a block start at 0 for each block`, function (done) {
      Books.getBlockByIndex(bookNameBeingUsed, 1).then(blockDoc => {
        expect(blockDoc.preSnippets[0].id).to.equal(0);
        expect(blockDoc.preSnippets[0].text).to.equal('The road was long.');
        expect(blockDoc.preSnippets[0].type).to.equal('narration');
        done();
      }).catch(done);
    });

    it(`updateBlockById gives updated value on 'blocks' key on Book if update is successful`, function (done) {
      let newBlock = {
        preSnippets: [new PreSnippet('Hi', 'narration', 0)],
        snippets: [new Snippet('Garen', 0)],
        status: 'complete',
      };
      Books.updateBlockById(bookNameBeingUsed, newBlock, 0).then(newBlocksArr => {
        expect(newBlocksArr.isMongooseArray).to.be.true;
        expect(newBlocksArr.length === 2).to.be.true;
        expect(newBlocksArr[0].status === 'complete').to.be.true;
        done();
      }).catch(done);
    });

    

  }));//end DESCRIBE ...  starting with a single book initialized
  after((done) => {
    console.log('Closing MongoDB connection...');
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
    done();
  })

});//end DESCRIBE ... <-- BOOK -->