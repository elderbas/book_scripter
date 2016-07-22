"use strict";
let expect = require('chai').expect;
let sCHelper = require('../src/snippetTypeHighlighterHelper.js');

describe('snippetTypeHighlighterHelper', () => {
  let isSpeechFriendlyChar = sCHelper.isSpeechFriendlyChar(`“`, `”`);
  let isNarrationFriendlyChar = sCHelper.isNarrationFriendlyChar(`“`, `”`);
  let isNewlineChar = sCHelper.isNewlineChar;

  it('isSpeechFriendlyChar friendlies', function () {
    expect(isSpeechFriendlyChar('“')).to.equal(true);
    expect(isSpeechFriendlyChar('”')).to.equal(true);
    expect(isSpeechFriendlyChar('a')).to.equal(true);
    expect(isSpeechFriendlyChar('A')).to.equal(true);
    expect(isSpeechFriendlyChar('.')).to.equal(true);
    expect(isSpeechFriendlyChar(';')).to.equal(true);
    expect(isSpeechFriendlyChar(`'`)).to.equal(true);
  });

  it('isSpeechFriendlyChar unfriendlies', function () {
    expect(isSpeechFriendlyChar(` `)).to.equal(false);
    expect(isSpeechFriendlyChar(`\t`)).to.equal(false);
    expect(isSpeechFriendlyChar(`\n`)).to.equal(false);
  });

  it('isNarrationFriendlyChar friendlies', function () {
    expect(isNarrationFriendlyChar('a')).to.equal(true);
    expect(isNarrationFriendlyChar('A')).to.equal(true);
    expect(isNarrationFriendlyChar('.')).to.equal(true);
    expect(isNarrationFriendlyChar(';')).to.equal(true);
    expect(isNarrationFriendlyChar(`'`)).to.equal(true);
  });

  it('isNarrationFriendlyChar unfriendlies', function () {
    expect(isNarrationFriendlyChar('“')).to.equal(false);
    expect(isNarrationFriendlyChar('”')).to.equal(false);
    expect(isNarrationFriendlyChar(` `)).to.equal(false);
    expect(isNarrationFriendlyChar(`\t`)).to.equal(false);
    expect(isNarrationFriendlyChar(`\n`)).to.equal(false);
    expect(isNarrationFriendlyChar(`\r`)).to.equal(false);
  });

  it('isNewlineChar true return', function () {
    expect(isNewlineChar('\n')).to.equal(true);
    expect(isNewlineChar('\r')).to.equal(true);
  });

  it('isNewlineChar false return', function () {
    expect(isNewlineChar(' ')).to.equal(false);
    expect(isNewlineChar('a')).to.equal(false);
    expect(isNewlineChar('1')).to.equal(false);
    expect(isNewlineChar(',')).to.equal(false);
    expect(isNewlineChar('“')).to.equal(false);
    expect(isNewlineChar('“')).to.equal(false);
    expect(isNewlineChar(`'`)).to.equal(false);
    expect(isNewlineChar('`')).to.equal(false);
  });
}); // end describe
































