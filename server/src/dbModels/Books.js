let _ = require('lodash');
let createPreSnippetsFromTextBlob = require('../createPreSnippetsFromTextBlob');
let Block = require('../classes/Classes').Block;
let Snippet = require('../classes/Classes').Snippet;
let Books = require('./mongooseModels').Books;
let errorMessages = require('../../constants/erroMessages');
let logger = require('../../../dopeAssHelpers').logger
// you can think of a schema as an INTERFACE. it doesn't do anything,
// it just tells you how it should look and its requirements. like a wishlist

// plan to use it for just knowing which books exists, probably for a list of books they can continue working on
let getNamesOfBooksLoaded = () => {
  return new Promise((fulfill, reject) => {
    Books.find({}, (e, arrOfBooks) => {
      if (e) { return reject(e); }
      fulfill({bookNames: _.map(arrOfBooks, 'bookName')});
    });
  });
};//end getNamesOfBooksLoaded

// creates all pre snippets for all blocks based on text blobs
let addBook = (bookName, textBlobs) => {
  // setDefaultsOnInsert, upsert
  return new Promise((fulfill, reject) => {
    // from text blobs to pre snippets
    let blocks = _.map(textBlobs, (textBlob, index) => {
      let preSnippets = createPreSnippetsFromTextBlob(textBlob);
      // set all pre snippets in a block to an id (although maybe we don't need to because their index in the array will be enough)
      preSnippets.forEach((pS, i) => pS.id = i);
      return new Block(preSnippets, [], undefined, index);
    });
    blocks[0].status = 'in progress'; // first one will be in progress
    let newBook = new Books({bookName, blocks, lastBlockIndexWorkedOn: 0});
    // console.log('BOOK ABOUT TO SAVE', JSON.stringify(newBook));
    newBook.save((err, book) => {
      // console.log('book JUST SAVED@#$%^&*(', book);
      if (err) {
        console.log('ERR in add book', err);
        return reject(err);
      }
      fulfill(book);
    });
  });
};//end addBook

// convenience function for providing data on start to get started
let addBookAndGetStarted = (bookName, textBlobs) => {
  return new Promise((fulfill, reject) => {
    addBook(bookName, textBlobs).then(bookDocJustAdded => {
      let toSend = {
        bookName: bookDocJustAdded.bookName,
        characterProfiles: bookDocJustAdded.characterProfiles,
        lastBlockIndexWorkedOn: bookDocJustAdded.lastBlockIndexWorkedOn,
        currentBlockWorkingOn: bookDocJustAdded.blocks[bookDocJustAdded.lastBlockIndexWorkedOn], // should be index 0
        blockStatuses: _.map(bookDocJustAdded.blocks, 'status')
      };
      fulfill(toSend);
    }).catch(e => reject(e))
  });
};

const dropModel = () => {
  return new Promise((fulfill, reject) => {
    Books.remove({}, (err) => {
      if (err) {return reject(err);}
      fulfill(`books dropped from Mongodb`);
    });
  });
};//end dropModel

const getCharacterProfiles = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill(bookDoc.characterProfiles);
    });
  });
};

const getCharacterProfilesAndVerbSpokeSynonyms = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill({
        characterProfiles: bookDoc.characterProfiles,
        verbSpokeSynonyms: bookDoc.verbSpokeSynonyms,
      });
    });
  });
};

// TODO NOT DONE, was just copy/pasted over mostly
// fulfill 'true' if saved correctly
const addVerbSpokeSynonym = (bookName, verbSpokeSynonymStr) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName},(err, bookDoc) => {
      if (err) {return reject(err);}
      // there's no duplicate if we get to here so we can add just fine
      bookDoc.verbSpokeSynonyms.push(verbSpokeSynonymStr);
      bookDoc.verbSpokeSynonyms = _.uniq(bookDoc.verbSpokeSynonyms);
      bookDoc.save((err) => {
        if (err) {return reject(err);}
        fulfill(true);
      });
    })
  });
};

/*
* bookName - string,
* newCharProfile - new CharacterProfile
*
* output: the characterProfiles array with the new charProf added
* throws error when: the newCharProfile has a non-unique displayName
* */
const addCharacterProfile = (bookName, newCharProfile) => {
  // let updateQuery = {$push: {characterProfiles: newCharProfile}};
  // let opts = {'new': true, runValidators: true};
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName},(err, bookDoc) => {
      if (err) {return reject(err);}
      // if there's a duplicate by that character name, reject (validation at app level although it should probably be at Mongoose level)
      if (_.some(bookDoc.characterProfiles, (cP) => cP.displayName === newCharProfile.displayName)) {
        return reject(new Error(errorMessages.characterProfileUnique))
      }

      bookDoc.characterProfiles.push(newCharProfile);
      bookDoc.save((err) => {
        if (err) {return reject(err);}
        fulfill(bookDoc);
      });
    })
  });
};

const getBlocks = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      if (bookDoc === null) {
        return fulfill([])
      }
      fulfill(bookDoc.blocks);
    });
  });
};

const getBlockByIndex = (bookName, indexOfBlockToGet) => {
  return getBlocks(bookName).then((blocks) => {
    return new Promise((fulfill, reject) => {
      fulfill(blocks[indexOfBlockToGet]);
    });
  });
};

// returns boolean for whether update was successful
const updateBlockById = (bookName, newBlockSubDoc, indexToUpdateBlockAt, optObjToAssign) => {
  return new Promise((fulfill, reject) => {
    let setObj = {};
    setObj[`blocks.${indexToUpdateBlockAt}`] = Object.assign({}, newBlockSubDoc, (optObjToAssign || {}))
    Books.findOneAndUpdate({bookName}, {"$set": setObj}, {new: true}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill(bookDoc.blocks);
    });
  });
};

const getBookInfo = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      let toSend = {
        bookName: bookDoc.bookName,
        characterProfiles: bookDoc.characterProfiles,

        //lastBlockIndexWorkedOn is used so when they do getBookInfo later,
        // they'll just get the most recently worked on block.
        // whenever a block gets marked as finished, lastBlockIndexWorkedOn will be
        // set to the next one grabbed
        lastBlockIndexWorkedOn: bookDoc.lastBlockIndexWorkedOn,
        currentBlockWorkingOn: bookDoc.blocks[bookDoc.lastBlockIndexWorkedOn], // should be index 0
        blockStatuses: _.map(bookDoc.blocks, 'status')
      };
      fulfill(toSend)
    });
  })
}


const nameConfirmedOnPreSnippet = (bookName, blockId, preSnippetId, displayNameConfirmed, snippetType) => {
  let setObj = {}, pushObj = {};
  setObj[`blocks.${blockId}.preSnippets.${preSnippetId}.personConfirmedNormalized`] = displayNameConfirmed
  pushObj[`blocks.${blockId}.snippets`] = new Snippet(displayNameConfirmed, preSnippetId, snippetType)
  let updateObj = {$set: setObj, $push: pushObj}
  return new Promise((fulfill, reject) => {
    Books.findOneAndUpdate({bookName}, updateObj, {new: true}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill(bookDoc.blocks[blockId]);
    });
  });
}

const setBlockAsCompletedAndGetNext = (bookName, blockId) => {
  let $set = { [`blocks.${blockId}.status`]: 'completed' };
  return new Promise((fulfill, reject) => {
    Books.findOneAndUpdate({bookName}, {$set}, {new: true}, (err, bookDoc) => {
      if (err) { return reject(err) }
      let nextBlock = bookDoc.blocks[blockId + 1]
      // we're at the end of the blocks, so just send back null
      if (nextBlock === undefined) {
        fulfill({
          statusOfBlockIdSent: bookDoc.blocks[blockId].status,
          nextBlock: null
        })
      }
      else {
        // if there's a way to do a condition update on the possibly non-existent block then
        // that way should replace this
        let $set2 = { 
          [`blocks.${blockId + 1}.status`]: 'in progress',
          lastBlockIndexWorkedOn: blockId + 1
        };
        Books.findOneAndUpdate({bookName}, {$set: $set2}, {new: true}, (err, evenNewerBookDoc) => {
          if (err) { return reject(err) }
          fulfill({
            statusOfBlockIdSent: evenNewerBookDoc.blocks[blockId].status,
            nextBlock: evenNewerBookDoc.blocks[blockId + 1]
          })
        })
      }
    })
  })
}

const booksExport = {
  // schema: bookSchema,
  getCharacterProfilesAndVerbSpokeSynonyms,
  getNamesOfBooksLoaded,
  getCharacterProfiles,
  addBookAndGetStarted,
  addCharacterProfile,
  addVerbSpokeSynonym,
  getBlockByIndex,
  updateBlockById,
  dropModel,
  getBlocks,
  addBook,
  getBookInfo,
  nameConfirmedOnPreSnippet,
  setBlockAsCompletedAndGetNext,
};
module.exports = booksExport;