"use strict";
let expect = require('chai').expect;
const speechClassifier = require('../src/speechClassifier.js');
const Stream = require('../src/classes/Stream.js');
const gotDataset = require('./dataSets/got.js');

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
      new Stream(15, 20, 'narration') // include the white space after a quote, and any text up to end up blob
    ]);
  });

  it('returns multiple objects for multiple sentences', function () {
    expect(speechClassifier(`Abc. “Ok, go.” Abc-b. “No, you.” Cha cha.`)).to.deep.equal([
      new Stream(0, 3, 'narration'),
      new Stream(5, 13, 'speech'),
      new Stream(15, 20, 'narration'),
      new Stream(22, 31, 'speech'),
      new Stream(33, 40, 'narration')
    ]);
  });

  it('returns error object for open char with no matching close pair', function () {
    expect(speechClassifier(`“Abc. “Abc.”`)).to.deep.equal([
      new Stream(0, 4, 'parseError'),
      new Stream(6, 11, 'speech')
    ]);
    let changedSample = `“I saw men freeze last winter, and the one before, when I was half a boy. Everyone talks about snows forty foot deep\n\n“Abc.”`;
    expect(speechClassifier(changedSample)).to.deep.equal([
      new Stream(0, 115, 'parseError'),
      new Stream(118, 123, 'speech')
    ]);
    expect(speechClassifier(`“Abc. `)).to.deep.equal([new Stream(0, 4, 'parseError')]);
    expect(speechClassifier(`“ `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
  });

  it('close quote with no open quote is parse error', function () {
    expect(speechClassifier(`”`)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(speechClassifier(`” `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(speechClassifier(`Abc”`)).to.deep.equal([new Stream(0, 3, 'parseError')]);
  });

  it('multiple close quote in row', function () {
    expect(speechClassifier(`“Abc””`)).to.deep.equal([
      new Stream(0, 4, 'speech'),
      new Stream(5, 5, 'parseError')
    ]);
    expect(speechClassifier(` “Abc””” `)).to.deep.equal([
      new Stream(1, 5, 'speech'),
      new Stream(6, 6, 'parseError'),
      new Stream(7, 7, 'parseError')
    ]);
  });

  /* RIGHT NOW IT CONSIDERS THIS STRING TO BE A SINGLE NARRATION */
  //it(`separates narrations by way of double line break (optional feature)`, function () {
  //  expect(speechClassifier(`A.\nB.\nC.`)).to.deep.equal([
  //    new Stream(0, 1, 'narration'),
  //    new Stream(3, 4, 'narration'),
  //    new Stream(6, 7, 'narration')
  //  ])
  //});

  it(`for kicks, simple GoT dataset`, function () {
    expect(speechClassifier(gotDataset.simple)).to.deep.equal([
      new Stream(1, 8, 'narration'),
      new Stream(12, 34, 'speech'),
      new Stream(36, 91, 'narration'),
      new Stream(94, 118, 'speech'),
      new Stream(121, 147, 'speech'),
    ]);
  });
});//end describe('bookStorageFormat'





