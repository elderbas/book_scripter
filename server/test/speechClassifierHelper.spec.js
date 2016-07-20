"use strict";
let expect = require('chai').expect;
let sCHelper = require('../src/speechClassifierHelper.js');

describe('speechClassifierHelper', () => {
  let isSpeechFriendlyChar = sCHelper.isSpeechFriendlyChar(`“`, `”`);
  let isNarrationFriendlyChar = sCHelper.isNarrationFriendlyChar(`“`, `”`);

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
  });




});
































