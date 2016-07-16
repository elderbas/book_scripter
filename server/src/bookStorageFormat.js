'use strict';

function bookStorageFormat(bookName, textBlobs) {
  return {
    indexAt: 0,
    bookName,
    textBlobs
  }
}

module.exports = bookStorageFormat;