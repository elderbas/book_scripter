let _ = require('lodash');
let createPreSnippetsForBlob = require('../createPreSnippetsForBlob');
let Block = require('../classes/Classes').Block;
let Books = require('./mongooseModels').Books;
let errorMessages = require('../../constants/erroMessages');
// you can think of a schema as an INTERFACE. it doesn't do anything,
// it just tells you how it should look and its requirements. like a wishlist



// plan to use it for just knowing which books exists, probably for a list of books they can continue working on
let _getNamesOfBooksLoaded = () => {
  return new Promise((fulfill, reject) => {
    Books.find({}, (e, arrOfBooks) => {
      if (e) { return reject(e); }
      fulfill({bookNames: _.map(arrOfBooks, 'bookName')});
    });
  });
};//end _getNamesOfBooksLoaded

// creates all pre snippets for all blocks based on text blobs
let _addBook = (bookName, textBlobs) => {
  // setDefaultsOnInsert, upsert
  return new Promise((fulfill, reject) => {
    // from text blobs to pre snippets
    let blocks = _.map(textBlobs, (textBlob) => {
      let preSnippets = createPreSnippetsForBlob(textBlob);
      return new Block(preSnippets);
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
};//end _addBook

// convenience function for providing data on start to get started
let _addBookAndGetStarted = (bookName, textBlobs) => {
  return new Promise((fulfill, reject) => {
    _addBook(bookName, textBlobs).then(bookDocJustAdded => {
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

const _dropModel = () => {
  return new Promise((fulfill, reject) => {
    Books.remove({}, (err) => {
      if (err) {return reject(err);}
      fulfill(`books dropped from Mongodb`);
    });
  });
};//end _dropModel

const _getCharacterProfiles = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill(bookDoc.characterProfiles);
    });
  });
};
/*
* bookName - string,
* newCharProfile - new CharacterProfile
*
* output: the characterProfiles array with the new charProf added
* throws error when: the newCharProfile has a non-unique displayName
* */
const _addCharacterProfile = (bookName, newCharProfile) => {
  // let updateQuery = {$push: {characterProfiles: newCharProfile}};
  // let opts = {'new': true, runValidators: true};
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName},(err, bookDoc) => {
      if (err) {return reject(err);}
      // if there's a duplicate by that character name, reject (validation at app level although it should probably be at Mongoose level)
      if (_.some(bookDoc.characterProfiles, (cP) => cP.displayName === newCharProfile.displayName)) {
        return reject(new Error(errorMessages.characterProfileUnique))
      }
      // there's no duplicate if we get to here so we can add just fine
      bookDoc.characterProfiles.push(newCharProfile);
      bookDoc.save((err) => {
        if (err) {return reject(err);}
        fulfill(bookDoc);
      });
    })
  });
};

const _getBlocks = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      fulfill(bookDoc.blocks);
    });
  });
};

const _getBlockByIndex = (bookName, indexOfBlockToGet) => {
  return _getBlocks(bookName).then((blocks) => {
    return new Promise((fulfill, reject) => {
      fulfill(blocks[indexOfBlockToGet]);
    });
  });
};

// returns boolean for whether update was successful
const _updateBlockById = (bookName, newBlockSubDoc, indexToUpdateBlockAt) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      bookDoc.blocks[indexToUpdateBlockAt] = newBlockSubDoc;
      bookDoc.save((err, newBookDoc) => {
        if (err) {return reject(err);}
        fulfill(newBookDoc.blocks);
      })
    });
  });
};

const booksExport = {
  // schema: bookSchema,
  getNamesOfBooksLoaded: _getNamesOfBooksLoaded,
  addBook: _addBook,
  dropModel: _dropModel,
  getCharacterProfiles: _getCharacterProfiles,
  addCharacterProfile: _addCharacterProfile,
  getBlocks: _getBlocks,
  getBlockByIndex: _getBlockByIndex,
  updateBlockById: _updateBlockById,
  addBookAndGetStarted: _addBookAndGetStarted,
};
module.exports = booksExport;