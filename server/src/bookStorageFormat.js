'use strict';

function bookStorageFormat(bookName, textBlobs) {
  return {
    bookName,
    textBlobs,
    indexAt: 0
  }
}

module.exports = bookStorageFormat;