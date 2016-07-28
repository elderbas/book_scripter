"use strict";
let expect = require('chai').expect;
let createPreSnippetsForBlob = require('../src/createPreSnippetsForBlob.js');
let Stream = require('../src/classes/Stream.js');
let PreSnippet = require('../src/classes/PreSnippet.js');

describe('createPreSnippetsForBlob', () => {
  it('exists as a function', function () {
    expect(typeof createPreSnippetsForBlob).to.equal('function');
  });

  // any iterating over the stream types here would probably be best fit for testing the
  // outputForStreamChars function inside createPreSnippetsForBlob but it seems unnecessary to add that right now
  it(`returns object for simple presnippet`, function () {
    let output = `Abc`;
    expect(createPreSnippetsForBlob('Abc')).to.deep.equal([
      new PreSnippet(output, 'narration', 0)
    ]);
  });

  it(`spaces around`, function () {
    expect(createPreSnippetsForBlob(' Abc ')).to.deep.equal([
      new PreSnippet(' ', 'whitespace', 0),
      new PreSnippet('Abc', 'narration', 1),
      new PreSnippet(' ', 'whitespace', 2)
    ]);
  });

  it(`new line chars`, function () {
    expect(createPreSnippetsForBlob('\nAbc\n')).to.deep.equal([
      new PreSnippet('\n', 'whitespace', 0),
      new PreSnippet('Abc', 'narration', 1),
      new PreSnippet('\n', 'whitespace', 2)
    ]);
  });

  it(`multiple streams`, function () {
    expect(createPreSnippetsForBlob('A “B,”\n\n“C. “D”')).to.deep.equal([
      new PreSnippet('A', 'narration', 0),
      new PreSnippet(' ', 'whitespace', 1),
      new PreSnippet('“B,”', 'speech', 2),
      new PreSnippet('\n\n', 'whitespace', 3),
      new PreSnippet('“C.', 'parseError', 4),
      new PreSnippet(' ', 'whitespace', 5),
      new PreSnippet('“D”', 'speech', 6),
    ]);
  });



});//end describe('bookStorageFormat'
































