const Books = (function () {
  let _ = require('lodash');
  let createPreSnippetsForBlob = require('../createPreSnippetsForBlob');
  let Block = require('../classes/Classes').Block;
  let mongoose = require('mongoose');
  let Schema = mongoose.Schema;
  // you can think of a schema as an INTERFACE. it doesn't do anything,
  // it just tells you how it should look and its requirements. like a wishlist
  let bookSchema = new Schema({
    bookName: {type: String, unique: true, required: true},
    blocks: {type: Array, default: []},
    characterProfiles: {type: Array, default: []}
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

  return {
    schema: bookSchema,
    getNamesOfBooksLoaded: _getNamesOfBooksLoaded,
    addBook: _addBook,
    dropModel: _dropModel
  }
} ());
module.exports = Books;