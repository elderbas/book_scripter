const Books = (function () {
  let _ = require('lodash');
  let createPreSnippetsForBlob = require('../createPreSnippetsForBlob');
  let Block = require('../classes/Classes').Block;
  let mongoose = require('mongoose');
  let Schema = mongoose.Schema;
  let errorMessages = require('../../constants/erroMessages');
  // you can think of a schema as an INTERFACE. it doesn't do anything,
  // it just tells you how it should look and its requirements. like a wishlist
  let characterProfileSchema = new Schema({
    displayName: String, // this needs to be unique but I'm not sure how to enforce uniqueness, except at the application level
    aliases: [String]
  });

  let bookSchema = new Schema({
    bookName: {type: String, unique: true, required: true},
    blocks: {type: Array, default: []},
    characterProfiles: [characterProfileSchema]
  });

  let modelTextName = 'books';
  let _model = mongoose.model(modelTextName, bookSchema);

  // plan to use it for just knowing which books exists, probably for a list of books they can continue working on
  let _getNamesOfBooksLoaded = () => {
    return new Promise((fulfill, reject) => {
      _model.find({}, (e, arrOfBooks) => {
        if (e) { return reject(e); }
        fulfill(_.map(arrOfBooks, 'bookName'));
      });
    });
  };//end _getNamesOfBooksLoaded
  
  let _addBook = (bookName, textBlobs) => {
    return new Promise((fulfill, reject) => {
      // from text blobs to pre snippets
      let count = 0;
      let blocks = _.map(textBlobs, (textBlob) => {
        let preSnippets = createPreSnippetsForBlob(textBlob);
        preSnippets.forEach(ps => (ps.id = count++));
        return new Block(preSnippets);
      });
      let newBook = new _model({bookName, blocks, characterProfile: []});
      newBook.save((err, book) => {
        // console.log('book', book);
        if (err) {
          console.log('ERR in add book', err);
          return reject(err); }
        fulfill(book);
      });
    });
  };//end _addBook

  const _dropModel = () => {
    return new Promise((fulfill, reject) => {
      _model.remove({}, (err) => {
        if (err) {return reject(err);}
        fulfill(`${modelTextName} dropped from Mongodb`);
      });
    });
  };//end _dropModel

  const _getCharacterProfiles = (bookName) => {
    return new Promise((fulfill, reject) => {
      _model.findOne({bookName}, (err, bookDoc) => {
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
      _model.findOne({bookName},(err, bookDoc) => {
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

  return {
    schema: bookSchema,
    getNamesOfBooksLoaded: _getNamesOfBooksLoaded,
    addBook: _addBook,
    dropModel: _dropModel,
    getCharacterProfiles: _getCharacterProfiles,
    addCharacterProfile: _addCharacterProfile
  }
} ());
module.exports = Books;