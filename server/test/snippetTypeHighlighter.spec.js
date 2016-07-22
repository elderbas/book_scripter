"use strict";
let expect = require('chai').expect;
const snippetTypeHighlighter = require('../src/snippetTypeHighlighter.js');
const Stream = require('../src/classes/Stream.js');
const gotDataset = require('./dataSets/got.js');

describe('snippetTypeHighlighter', () => {
  it('exists as a function', function () {
    expect(typeof snippetTypeHighlighter).to.equal('function');
  });

  it('returns object specifying position of speech with only single speech utterance', function () {
    const testText = `“Abc”`;
    expect(snippetTypeHighlighter(testText)).to.deep.equal([new Stream(0, 4, 'speech')]);
  });

  it('ignore white space on either sides of speech streams', function () {
    expect(snippetTypeHighlighter(`\n“Abc” \n `)).to.deep.equal([new Stream(1, 5, 'speech')]);
    expect(snippetTypeHighlighter(`\n“Abc”\n\t“Xyz”\n`)).to.deep.equal([new Stream(1, 5, 'speech'), new Stream(8, 12, 'speech')]);
  });

  it('correct order and streams for mixed, also ignoring white spaces', function () {
    const testText = `Abc. “Ok, go.”\nAbc-b.\n \t`;
    expect(snippetTypeHighlighter(testText)).to.deep.equal([
      new Stream(0, 3, 'narration'), // include white space up to open quote
      new Stream(5, 13, 'speech'),
      new Stream(15, 20, 'narration') // include the white space after a quote, and any text up to end up blob
    ]);
  });

  it('returns multiple objects for multiple sentences', function () {
    expect(snippetTypeHighlighter(`Abc. “Ok, go.” Abc-b. “No, you.” Cha cha.`)).to.deep.equal([
      new Stream(0, 3, 'narration'),
      new Stream(5, 13, 'speech'),
      new Stream(15, 20, 'narration'),
      new Stream(22, 31, 'speech'),
      new Stream(33, 40, 'narration')
    ]);
  });

  it('returns error object for open char with no matching close pair', function () {
    expect(snippetTypeHighlighter(`“Abc. “Abc.”`)).to.deep.equal([
      new Stream(0, 4, 'parseError'),
      new Stream(6, 11, 'speech')
    ]);
    let changedSample = `“I saw men freeze last winter, and the one before, when I was half a boy. Everyone talks about snows forty foot deep\n\n“Abc.”`;
    expect(snippetTypeHighlighter(changedSample)).to.deep.equal([
      new Stream(0, 115, 'parseError'),
      new Stream(118, 123, 'speech')
    ]);
    expect(snippetTypeHighlighter(`“Abc. `)).to.deep.equal([new Stream(0, 4, 'parseError')]);
    expect(snippetTypeHighlighter(`“ `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
  });

  it('close quote with no open quote is parse error', function () {
    expect(snippetTypeHighlighter(`”`)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(snippetTypeHighlighter(`” `)).to.deep.equal([new Stream(0, 0, 'parseError')]);
    expect(snippetTypeHighlighter(`Abc”`)).to.deep.equal([new Stream(0, 3, 'parseError')]);
  });

  it('multiple close quote in row', function () {
    expect(snippetTypeHighlighter(`“Abc””`)).to.deep.equal([
      new Stream(0, 4, 'speech'),
      new Stream(5, 5, 'parseError')
    ]);
    expect(snippetTypeHighlighter(` “Abc””” `)).to.deep.equal([
      new Stream(1, 5, 'speech'),
      new Stream(6, 6, 'parseError'),
      new Stream(7, 7, 'parseError')
    ]);
  });

  it(`separates narrations by way of new line chars using non-default params`, function () {
    expect(snippetTypeHighlighter(`A.\nB.\nC.`, null, null, true)).to.deep.equal([
      new Stream(0, 1, 'narration'),
      new Stream(3, 4, 'narration'),
      new Stream(6, 7, 'narration')
    ]);
    expect(snippetTypeHighlighter(`A.\rB.\rC.`, null, null, true)).to.deep.equal([
      new Stream(0, 1, 'narration'),
      new Stream(3, 4, 'narration'),
      new Stream(6, 7, 'narration')
    ]);
    expect(snippetTypeHighlighter(`A.\n\nB.`, null, null, true)).to.deep.equal([
      new Stream(0, 1, 'narration'), new Stream(4, 5, 'narration')
    ]);
    expect(snippetTypeHighlighter(`\nA.\n\nB.\n`, null, null, true)).to.deep.equal([
      new Stream(1, 2, 'narration'), new Stream(5, 6, 'narration')
    ]);
  });

  it('sets a speech stream as parseError type if a newline comes between an openChar and closeChar', function () {
    expect(snippetTypeHighlighter(`“B\n`, null, null, true)).to.deep.equal([new Stream(0, 1, 'parseError')]);
    expect(snippetTypeHighlighter(`“B\n”`, null, null, true)).to.deep.equal([
      new Stream(0, 1, 'parseError'),new Stream(3, 3, 'parseError')
    ]);
  });

  it(`for kicks, simple GoT dataset`, function () {
    expect(snippetTypeHighlighter(gotDataset.simple)).to.deep.equal([
      new Stream(1, 8, 'narration'),
      new Stream(12, 34, 'speech'),
      new Stream(36, 91, 'narration'),
      new Stream(94, 118, 'speech'),
      new Stream(121, 147, 'speech'),
    ]);
  });
});//end describe('bookStorageFormat'





