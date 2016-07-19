"use strict";
let expect = require('chai').expect;
let speechClassifier = require('../src/speechClassifier.js');
let Stream = require('../src/classes/Stream.js');


describe('speechClassifier', () => {
  it('exists as a function', function () {
    expect(typeof speechClassifier).to.equal('function');
  });

  it('returns object specifying position of speech with only single speech utterance', function () {
    const testText = `“Abc”`;
    expect(speechClassifier(testText)).to.deep.equal([new Stream(0, 4, 'speech')]);
  });

  it('returns object specifying position of speech with only single speech utterance and line breaks', function () {
    const testText = `\n“Abc”\n`;
    expect(speechClassifier(testText)).to.deep.equal([new Stream(0, 5, 'speech')]);
  });

  it('returns object specifying position of speech utterance with narration mixed', function () {
    const testText = `Abc. “Ok, go.” Abc-b.`;
    expect(speechClassifier(testText)).to.deep.equal([
      new Stream(0, 4, 'narration'), // include white space up to open quote
      new Stream(5, 13, 'speech'),
      new Stream(14, 20, 'narration') // include the white space after a quote, and any text up to end up blob
    ]);
  });

  it('returns multiple objects for multiple sentences', function () {
    const testText = `Abc. “Ok, go.” Abc-b. “No, you.” Cha cha.`;
    expect(speechClassifier(testText)).to.deep.equal([
      {openCharIndex: 0, closeCharIndex: 4}, {openCharIndex: 5, closeCharIndex: 13},
      {openCharIndex: 14, closeCharIndex: 21}, {openCharIndex: 22, closeCharIndex: 31},
      {openCharIndex: 32, closeCharIndex: 40}
    ]);

    expect(speechClassifier(testText)).to.deep.equal([
      new Stream(0, 4, 'narration'), new Stream(5, 13, 'speech'),
      new Stream(14, 21, 'narration'), new Stream(22, 31, 'speech'),
      new Stream(32, 40, 'narration')
    ]);
  });

  it('returns error object for open char with no matching close pair', function () {
    const testText = `“Abc. “Abc.”`;
    expect(speechClassifier(testText)).to.deep.equal([new Stream(0, 5, 'parseError'), new Stream(6, 11, 'speech')]);
  });
});//end describe('bookStorageFormat'
































