"use strict";
let expect = require('chai').expect;
let bookSplitter = require('../src/bookSplitter.js');

describe('bookSplitter', () => {
  it('exists as a function', function () {
    expect(typeof bookSplitter).to.equal('function');
  });

  it('validates for strPatternToSplitOn key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        splitAtThisIntervalIndex: 2,
        textToSplit: 'abc'
      });
    }).to.throw(Error);
  });

  it('validates for splitAtThisIntervalIndex key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        strPatternToSplitOn: '\n\n',
        textToSplit: 'abc'
      });
    }).to.throw(Error);
  });

  it('validates for textToSplit key by throwing an error', function () {
    expect(() => {
      bookSplitter({
        splitAtThisIntervalIndex: 2,
        strPatternToSplitOn: '\n\n'
      });
    }).to.throw(Error);
  });

  it('splits on simple', function () {
    let splitResult = bookSplitter({
      strPatternToSplitOn: ' ',
      splitAtThisIntervalIndex: 0,
      textToSplit: 'a b c'
    });
    expect(splitResult[0]).to.equal('a ');
    expect(splitResult[1]).to.equal('b ');
    expect(splitResult[2]).to.equal('c');
  });

  it('splits on pattern match where splitAtThisIntervalIndex is GREATER than index of first strPatternToSplitOn match', function () {
    let splitResult = bookSplitter({
      strPatternToSplitOn: '\n\n',
      splitAtThisIntervalIndex: 10,
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

  it('splits on pattern match where splitAtThisIntervalIndex is LESSER than index of first strPatternToSplitOn match', function () {
    let splitResult = bookSplitter({
      strPatternToSplitOn: '\n\n',
      splitAtThisIntervalIndex: 50,
      textToSplit: [
        '“You know what?” said Billy\n\n', // length of 29
        '“I am through” responded Charles\n\n',
        'Bye Bye'
      ].join('')
    });
    // we want it to catch after first occurrences of the pattern occur based on the splitAtThisIntervalIndex
    expect(splitResult[0]).to.equal('“You know what?” said Billy\n\n“I am through” responded Charles\n\n');
    expect(splitResult[1]).to.equal('Bye Bye');
  });
});
































