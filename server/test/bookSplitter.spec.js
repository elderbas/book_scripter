"use strict";
let expect = require('chai').expect;
let bookSplitter = require('../src/bookSplitter.js');

describe('bookSplitter', () => {
  it('exists as a function', function () {
    expect(typeof bookSplitter).to.equal('function');
  });

  it('validates for strPattern key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        indexIntervalCount: 2,
        textToSplit: 'abc'
      });
    }).to.throw(Error);
  });

  it('validates for indexIntervalCount key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        strPattern: '\n\n',
        textToSplit: 'abc'
      });
    }).to.throw(Error);
  });

  it('validates for textToSplit key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        indexIntervalCount: 2,
        strPattern: '\n\n'
      });
    }).to.throw(Error);
  });

  it('splits on simple', function () {
    let splitResult = bookSplitter({
      strPattern: ' ',
      indexIntervalCount: 0,
      textToSplit: 'a b c'
    });
    expect(splitResult[0]).to.equal('a ');
    expect(splitResult[1]).to.equal('b ');
    expect(splitResult[2]).to.equal('c');
  });

  it('splits on pattern match where indexIntervalCount is GREATER than index of first strPattern match', function () {
    let splitResult = bookSplitter({
      strPattern: '\n\n',
      indexIntervalCount: 10,
      textToSplit: [
        '“Hey what are you doing today sir duggins?” said Billy\n\n', // length of 56
        '“By George I don\'t know. What do you think?” responded Charles\n\n',
        'Bye Bye'
      ].join('')
    });
    expect(splitResult[0]).to.equal('“Hey what are you doing today sir duggins?” said Billy\n\n');
    expect(splitResult[1]).to.equal('“By George I don\'t know. What do you think?” responded Charles\n\n');
    expect(splitResult[2]).to.equal('Bye Bye');
  });

  it('splits on pattern match where indexIntervalCount is LESSER than index of first strPattern match', function () {
    let splitResult = bookSplitter({
      strPattern: '\n\n',
      indexIntervalCount: 50,
      textToSplit: [
        '“You know what?” said Billy\n\n', // length of 29
        '“I am through” responded Charles\n\n',
        'Bye Bye'
      ].join('')
    });
    // we want it to catch after first occurrences of the pattern occur based on the indexIntervalCount
    expect(splitResult[0]).to.equal('“You know what?” said Billy\n\n“I am through” responded Charles\n\n');
    expect(splitResult[1]).to.equal('Bye Bye');
  });
});
































