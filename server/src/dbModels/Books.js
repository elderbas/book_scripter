let _ = require('lodash');
let createPreSnippetsFromTextBlob = require('../createPreSnippetsFromTextBlob');
let Block = require('../classes/Classes').Block;
let Snippet = require('../classes/Classes').Snippet;
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
      let preSnippets = createPreSnippetsFromTextBlob(textBlob);
      // set all pre snippets in a block to an id (although maybe we don't need to because their index in the array will be enough)
      preSnippets.forEach((pS, i) => pS.id = i);
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

const _getCharacterProfilesAndVerbSpokeSynonyms = (bookName) => {
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
const _addVerbSpokeSynonym = (bookName, verbSpokeSynonymStr) => {
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

const _getBookInfo = (bookName) => {
  return new Promise((fulfill, reject) => {
    Books.findOne({bookName}, (err, bookDoc) => {
      if (err) {return reject(err);}
      let toSend = {
        bookName: bookDoc.bookName,
        characterProfiles: bookDoc.characterProfiles,
        lastBlockIndexWorkedOn: bookDoc.lastBlockIndexWorkedOn,
        currentBlockWorkingOn: bookDoc.blocks[bookDoc.lastBlockIndexWorkedOn], // should be index 0
        blockStatuses: _.map(bookDoc.blocks, 'status')
      };
      fulfill(toSend)
    });
  })
}


// _updateBlockById = (bookName, newBlockSubDoc, indexToUpdateBlockAt) => {
const _nameConfirmedOnPreSnippet = (bookNameBeingUsed, blockId, preSnippetId, displayNameConfirmed, snippetType) => {
  return _getBlockByIndex(bookNameBeingUsed, blockId).then((blockToUpdate) => {
    blockToUpdate.snippets.push(new Snippet(displayNameConfirmed, preSnippetId, snippetType))
    blockToUpdate.preSnippets = blockToUpdate.preSnippets.map(preSnippet => {
      if (preSnippet.id === preSnippetId) {
        preSnippet.personConfirmedNormalized = displayNameConfirmed
      }
      return preSnippet
    })
    return new Promise((fulfill, reject) => {
      _updateBlockById(bookNameBeingUsed, blockToUpdate, blockId)
        .then((blocks) => {
          fulfill(blocks[blockId])
        })
        .catch(reject)
    })
  })
}

const booksExport = {
  // schema: bookSchema,
  getCharacterProfilesAndVerbSpokeSynonyms: _getCharacterProfilesAndVerbSpokeSynonyms,
  getNamesOfBooksLoaded: _getNamesOfBooksLoaded,
  getCharacterProfiles: _getCharacterProfiles,
  addBookAndGetStarted: _addBookAndGetStarted,
  addCharacterProfile: _addCharacterProfile,
  addVerbSpokeSynonym: _addVerbSpokeSynonym,
  getBlockByIndex: _getBlockByIndex,
  updateBlockById: _updateBlockById,
  dropModel: _dropModel,
  getBlocks: _getBlocks,
  addBook: _addBook,
  getBookInfo: _getBookInfo,
  nameConfirmedOnPreSnippet: _nameConfirmedOnPreSnippet,
};
module.exports = booksExport;