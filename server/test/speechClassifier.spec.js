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

  it('ignore white space on either sides of speech streams', function () {
    expect(speechClassifier(`\n“Abc” \n `)).to.deep.equal([new Stream(1, 5, 'speech')]);
    expect(speechClassifier(`\n“Abc”\n\t“Xyz”\n`)).to.deep.equal([new Stream(1, 5, 'speech'), new Stream(8, 12, 'speech')]);
  });

  it('correct order and streams for mixed, also ignoring white spaces', function () {
    const testText = `Abc. “Ok, go.”\nAbc-b.\n \t`;
    expect(speechClassifier(testText)).to.deep.equal([
      new Stream(0, 3, 'narration'), // include white space up to open quote
      new Stream(5, 13, 'speech'),
      new Stream(14, 20, 'narration') // include the white space after a quote, and any text up to end up blob
    ]);
  });

  it('returns multiple objects for multiple sentences', function () {
    expect(speechClassifier(`Abc. “Ok, go.” Abc-b. “No, you.” Cha cha.`)).to.deep.equal([
      new Stream(0, 4, 'narration'), new Stream(5, 13, 'speech'),
      new Stream(14, 21, 'narration'), new Stream(22, 31, 'speech'),
      new Stream(32, 40, 'narration')
    ]);
  });

  it('returns error object for open char with no matching close pair', function () {
    expect(speechClassifier(`“Abc. “Abc.”`)).to.deep.equal([new Stream(0, 4, 'parseError'), new Stream(6, 11, 'speech')]);
    expect(speechClassifier(`“Abc. `)).to.deep.equal([new Stream(0, 4, 'parseError')]);
    expect(speechClassifier(`“ `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
  });

  it('close quote with no open quote is parse error', function () {
    expect(speechClassifier(`”`)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(speechClassifier(`” `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(speechClassifier(`Abc”`)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(speechClassifier(`“Abc””`)).to.deep.equal([new Stream(0, 4, 'speech'), new Stream(5, 5, 'parseError')]);
  });
});//end describe('bookStorageFormat'
































