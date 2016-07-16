'use strict';
let _ = require('lodash');
function bookStorageFormat(bookName, textBlobs) {
  let objToStore =  {
    indexAt: 0,
    bookName,
    characterNames: [],
    textBlobs
  };
  objToStore.snippetBlocks = _.range(textBlobs.length).map((nil, index) => {
    return {
      blockId: index,
      dateCompleted: null,
      status: 'untouched',
      snippets: []
    };
  });
  return objToStore;
}

module.exports = bookStorageFormat;