let expect = require('chai').expect;
let mongoose = require('mongoose');
var config = require('../../config.js');
let Classes = require('../../src/classes/Classes');
let PreSnippet = Classes.PreSnippet;
let CharacterProfile = Classes.CharacterProfile;
let Snippet = Classes.Snippet;

// arrays returned from mongoose inputs have extra keys on it so it ends up being a NON deep equal
function deepCheckStringArrayMongoose (a, b) {
  a.forEach((v, i) => {
    expect(a[i]).to.equal(b[i]);
  });
}
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb.integrationTest);
let Books = require('../../src/dbModels/Books');


describe('<-- Books collection-->\n', () => {
  describe(`...starting with completely FRESH collection`, () => {
    beforeEach(function (done) {
      Books.dropModel().then(() => done());
    });

    it(`retrieves empty array if no books are loaded`, (done) => {
      Books.getNamesOfBooksLoaded().then((arrayNames) => {
        expect(arrayNames).to.deep.equal([]);
        done();
      });
    });
    

  });//end DESCRIBE ...starting with completely FRESH collection

  describe(`... starting with a SINGLE BOOK initialized`, (() => {
    const bookNameBeingUsed = 'ASOIAF - Game of Thrones';
    beforeEach((done) => {
      let inputTextBlobs = ['“Am I?” he asked. “Yes.”']; // only enough for one Block, however
      let outputPreSnippetsForFirstBlock = [
        new PreSnippet('“Am I?”', 'speech', 0),
        new PreSnippet(' ', 'whitespace', 1),
        new PreSnippet('he asked.', 'narration', 2),
        new PreSnippet(' ', 'whitespace', 3),
        new PreSnippet('“Am I?”', 'speech', 4),
      ];
      let outputFirstBlock = {
        preSnippets: outputPreSnippetsForFirstBlock,
        status: 'untouched',
        snippets: []
      };
      Books.addBook(bookNameBeingUsed, inputTextBlobs).then(addedBook => done());
    });

    afterEach((done) => {
      Books.dropModel().then(() => done());
    });

    it(`getNamesOfBooksLoaded returns array of strings`, function (done) {
      Books.getNamesOfBooksLoaded().then(arrOfNames => {
        expect(arrOfNames).to.deep.equal([bookNameBeingUsed]);
        done();
      });
    });

    it(`retrieves empty array if no characterProfiles have been added`, function (done) {

      Books.getCharacterProfiles(bookNameBeingUsed).then((cPs) => {
        expect(cPs.isMongooseArray && cPs.length === 0).to.be.true;
        done();
      });
    });

    it(`returns the whole characterProfiles after one is added`, function (done) {
      let newCharProf = new CharacterProfile('Garen');
      Books.addCharacterProfile(bookNameBeingUsed, newCharProf).then((cPs) => {
        expect(cPs.characterProfiles[0].displayName).to.equal('Garen');
        expect(cPs.characterProfiles.length).to.equal(1);
        done();
      });
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
      });
    });

    it(`getBlockByIndex`, function (done) {
      Books.getBlockByIndex(bookNameBeingUsed, 0).then((blockDoc) => {
        expect(blockDoc).to.have.all.keys(['preSnippets', 'snippets', 'status']);
        done();
      });
    });

    it(`updateBlockById`, function (done) {
      let newBlock = {
        preSnippets: [new PreSnippet('Hi', 'narration', 0)],
        snippets: [new Snippet('Garen', 0)],
        status: 'complete',
      };
      Books.updateBlockById(bookNameBeingUsed, newBlock, 0).then(updateWasSuccessful => {
        expect(updateWasSuccessful).to.be.true;
        done();
      });
    });

    

  }));//end DESCRIBE ...  starting with a single book initialized
  

});//end DESCRIBE ... <-- BOOK -->