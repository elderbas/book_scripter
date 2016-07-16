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
      indexAt: 0
    });
  });
});//end describe('bookStorageFormat'
































