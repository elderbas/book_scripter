"use strict";
let expect = require('chai').expect;
let textExtractorForPreInjection = require('../src/textExtractorForPreInjection.js');
let Stream = require('../src/classes/Stream.js');
let PreSnippet = require('../src/classes/PreSnippet.js');

let typesOfStreams = ['speech', 'narration', 'parseError'];
describe('textExtractorForPreInjection', () => {
  it('exists as a function', function () {
    expect(typeof textExtractorForPreInjection).to.equal('function');
  });

  // any iterating over the stream types here would probably be best fit for testing the
  // outputForStreamChars function inside textExtractorForPreInjection but it seems unnecessary to add that right now
  it(`returns object for simple presnippet`, function () {
    typesOfStreams.forEach(streamType => {
      //let output = `<span class="simple ${streamType}-simple">Abc</span>`;
      let output = `Abc`;
      expect(textExtractorForPreInjection('Abc', [new Stream(0, 2, streamType)])).to.deep.equal([
        new PreSnippet(output, streamType)
      ]);
    });
  });

  it(`spaces around`, function () {
    typesOfStreams.forEach(streamType => {
      expect(textExtractorForPreInjection(' Abc ', [new Stream(1, 3, streamType)])).to.deep.equal([
        new PreSnippet(' ', 'whitespace'),
        new PreSnippet('Abc', streamType),
        new PreSnippet(' ', 'whitespace')
      ]);
    });
  });

  it(`new line chars`, function () {
    typesOfStreams.forEach(streamType => {
      expect(textExtractorForPreInjection('\nAbc\n', [new Stream(1, 3, streamType)])).to.deep.equal([
        new PreSnippet('\n', 'whitespace'),
        new PreSnippet('Abc', streamType),
        new PreSnippet('\n', 'whitespace')
      ]);
    });
  });

  it(`multiple streams`, function () {
    expect(textExtractorForPreInjection('A “B”', [
      new Stream(0, 0, 'narration'),
      new Stream(2, 4, 'speech')
    ])).to.deep.equal([
      new PreSnippet('A', 'narration'),
      new PreSnippet(' ', 'whitespace'),
      new PreSnippet('“B”', 'speech'),
    ]);
  });



});//end describe('bookStorageFormat'
































