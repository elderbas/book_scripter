"use strict";
let expect = require('chai').expect;
let bookStorageFormat = require('../src/bookStorageFormat.js');

describe('bookStorageFormat', () => {
  it('exists as a function', function () {
    expect(typeof bookStorageFormat).to.equal('function');
  });

  it('returns formatted object if all valid arguments passed', function () {
    expect(bookStorageFormat('Letters of Alphabet', ['a', 'b', 'c'])).to.eql({
      bookName: 'Letters of Alphabet',
      textBlobs: ['a', 'b', 'c'],
      indexAt: 0,
      characterNames: [],
      formattedSnippets: [{
        "blockId": 0,
        "dateCompleted": null,
        "status": "untouched",
        "snippets": []
      },
      {
        "blockId": 1,
        "dateCompleted": null,
        "status": "untouched",
        "snippets": []
      },
      {
        "blockId": 2,
        "dateCompleted": null,
        "status": "untouched",
        "snippets": []
      }]
    });
  });
});//end describe('bookStorageFormat'
































