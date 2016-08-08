let expect = require('chai').expect;
let mongoose = require('mongoose');
var config = require('../../config.js');
let PreSnippet = require('../../src/classes/Classes').PreSnippet;
// arrays returned from mongoose inputs have extra keys on it so it ends up being a NON deep equal
function deepCheckStringArrayMongoose (a, b) {
  a.forEach((v, i) => {
    expect(a[i]).to.equal(b[i]);
  });
}

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb.integrationTest);
let Books = require('../../src/dbModels/Books');
describe('<-- Books -->\n', () => {
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
      Books.addBook('ASOIAF - Game of Thrones', inputTextBlobs).then((addedBook) => {
        // expect(addedBook.bookName).to.equal('ASOIAF - Game of Thrones');
        // expect(addedBook.blocks[0]).to.deep.equal(outputFirstBlock);
        // expect(addedBook.characterProfiles).to.be.empty;
        // expect(addedBook.characterProfiles.isMongooseArray).to.be.true;
        done();
      });

    });
    afterEach((done) => {
      Books.dropModel().then(() => done());
    });
    
    it(`getNamesOfBooksLoaded returns array of strings`, function (done) {
      Books.getNamesOfBooksLoaded().then(arrOfNames => {
        expect(arrOfNames).to.deep.equal(['ASOIAF - Game of Thrones']);
        done();
      });
    });
  }));//end DESCRIBE ...  starting with a single book initialized

});//end DESCRIBE ... <-- BOOK -->