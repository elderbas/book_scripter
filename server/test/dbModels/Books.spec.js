let chai = require('chai');
let expect = chai.expect;
let should = chai.should;
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

    it(`.getNamesOfBooksLoaded retrieves empty array if no books are loaded`, (done) => {
      Books.getNamesOfBooksLoaded().then((arrayNames) => {
        expect(arrayNames).to.deep.equal({bookNames: []});
        done();
      });
    });

    it(`.addBook provides entire book document just added`, function (done) {
      Books.addBook('ExampleBook', ['A “B”', '“C” D.']).then(bookDocJustadded => {
        let bdja = bookDocJustadded;
        expect(bdja.bookName).to.equal('ExampleBook');
        expect(bdja.lastBlockIndexWorkedOn).to.equal(0);
        expect(bdja.characterProfiles.length === 0 && bdja.characterProfiles.isMongooseArray).to.be.true;
        expect(bdja.blocks[0].snippets.length).to.equal(0);
        expect(bdja.blocks[0].status).to.equal('in progress');
        expect(bdja.blocks[1].status).to.equal('untouched');

        let preSnip0 = bdja.blocks[0].preSnippets;
        let preSnip1 = bdja.blocks[1].preSnippets;
        expect(preSnip0.length).to.equal(3);
        expect(preSnip1.length).to.equal(3);
        expect(preSnip0[2].type === 'speech' && preSnip0[2].text === '“B”').to.be.true;
        expect(preSnip1[2].type === 'narration' && preSnip1[2].text === 'D.').to.be.true;
        Books.dropModel().then(() => done());
      })
      .catch((e) => {
        Books.dropModel().then(() => done(e));
      });
    });

    it(`.addBookAndGetStarted provides necessary data to get started`, function (done) {
      Books.addBookAndGetStarted('ExampleBook', ['“A”']).then(getStartedWorkingData => {
        let gswd = getStartedWorkingData;
        expect(gswd.bookName).to.equal('ExampleBook');
        expect(gswd.lastBlockIndexWorkedOn).to.equal(0);
        expect(gswd.characterProfiles.length === 0 && gswd.characterProfiles.isMongooseArray).to.be.true;
        expect(gswd.currentBlockWorkingOn.snippets.length).to.equal(0);
        expect(gswd.currentBlockWorkingOn.status).to.equal('in progress');

        let preSnip = gswd.currentBlockWorkingOn.preSnippets;
        expect(preSnip.length).to.equal(1);
        expect(preSnip[0].type === 'speech' && preSnip[0].text === '“A”').to.be.true;
        Books.dropModel().then(() => done());
      })
      .catch((e) => {
        Books.dropModel().then(() => done(e));
      });
    });

    
    

  });//end DESCRIBE ...starting with completely FRESH collection

  //noinspection JSUnresolvedFunction
  describe(`starting with a SINGLE BOOK initialized -->`, (() => {
    const bookNameBeingUsed = 'ASOIAF - Game of Thrones';
    let addedBookInBeforeEach;
    beforeEach((done) => {
      // should result in two Blocks
      let inputTextBlobs = [
        '“Am I?” he asked. “Yes.”',
        'The road was long. “Are we there yet?” John mumbled “Almost there.”'
      ];
      Books.addBook(bookNameBeingUsed, inputTextBlobs).then(addedBook => {
        addedBookInBeforeEach = addedBook
        done()
      });
    });

    afterEach((done) => {
      Books.dropModel().then(() => done());
    });

    /* update the key 'personConfirmedNormalized' of the specified preSnippet (to furtherHelp predictions)
    * push a new snippet onto the snippets for that block*/
    it(`.nameConfirmedOnPreSnippet`, function (done) {
      let expectedSnippet =  {characterDisplayName: 'Rocco', matchingPreSnippetId: 0, snippetType: 'speech'}
      let blockId = 0, preSnippetId = 0, displayNameConfirmed = 'Rocco', snippetType = 'speech';
      // Before preSnippet is updated, before snippet is pushed onto
      expect(addedBookInBeforeEach.blocks[0].preSnippets[0].personConfirmedNormalized).to.be.null;
      expect(addedBookInBeforeEach.blocks[0].snippets.length).to.equal(0)

      Books.nameConfirmedOnPreSnippet(bookNameBeingUsed, blockId, preSnippetId, displayNameConfirmed, snippetType)
        .then(newBlock => {
          expect(newBlock.preSnippets[0].personConfirmedNormalized).to.equal('Rocco');
          expect(newBlock.snippets[0]).to.deep.equal(expectedSnippet)
          done()
        })
        .catch(done)
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

    describe(`.addCharacterProfile`, () => {
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
    });//end ..addCharacterProfile

    describe(`.setBlockAsCompletedAndGetNext`, () => {
      it(`no more after this one`, function (done) {
        let newCharProf = new CharacterProfile('Garen');
        Books.setBlockAsCompletedAndGetNext(bookNameBeingUsed, 0).then((resp) => {

          done();
        }).catch(done);
      });


    });//end .setBlockAsCompletedAndGetNext

    
    describe(`.getBlockByIndex`, () => {
      it(`object with 'preSnippets', 'snippets', and 'status' key`, function (done) {
        Books.getBlockByIndex(bookNameBeingUsed, 0).then(blockDoc => {
          expect(blockDoc).to.have.all.keys(['preSnippets', 'snippets', 'status']);
          done();
        }).catch(done);
      });

      it(`makes first the first block's status 'in progress by default'`, function (done) {
        Books.getBlockByIndex(bookNameBeingUsed, 0).then(blockDoc => {
          expect(blockDoc.status).to.equal('in progress');
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
    });//end .getBlockByIndex



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

    it(`getCharacterProfilesAndVerbSpokeSynonyms`, function (done) {
      Books.getCharacterProfilesAndVerbSpokeSynonyms(bookNameBeingUsed).then(charPAndVSS => {
        expect(charPAndVSS).to.have.all.keys(['characterProfiles', 'verbSpokeSynonyms']);
        done();
      })
    });
    
    describe(`.addVerbSpokeSynonym`, () => {
      it(`returns 'true' if successful for single verb string passed`, function (done) {
        Books.getCharacterProfilesAndVerbSpokeSynonyms(bookNameBeingUsed)
          .then((cPandVSS) => {
            expect(cPandVSS.verbSpokeSynonyms).to.have.length(0);
            return Books.addVerbSpokeSynonym(bookNameBeingUsed, 'yodaleyeehooed');
          })
          .then((correctlyAdded) => {
            expect(correctlyAdded).to.be.true;
            return Books.getCharacterProfilesAndVerbSpokeSynonyms(bookNameBeingUsed);
          })
          .then((cPandVSS) => {
            expect(cPandVSS.verbSpokeSynonyms[0]).to.equal('yodaleyeehooed');
            expect(cPandVSS.verbSpokeSynonyms).to.have.length(1);
            done();
          });
        // let prom = Books.addVerbSpokeSynonym(bookNameBeingUsed, '');
      });
    });//end .addVerbSpokeSynonym

    

  }));//end DESCRIBE ...  starting with a single book initialized
  after((done) => {
    console.log('Closing MongoDB connection...');
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
    done();
  })

});//end DESCRIBE ... <-- BOOK -->