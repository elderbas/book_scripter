"use strict";
let expect = require('chai').expect;
let preSnippetsAnalyzer = require('../src/preSnippetsAnalyzer.js');
let PreSnippet = require('../src/classes/PreSnippet.js');

describe('preSnippetsAnalyzer', () => {
  it('exists as a function', function () {
    expect(typeof preSnippetsAnalyzer).to.equal('function');
  });

  it('simple single', function () {
    let input = [new PreSnippet('Bob says hi.', 'narration')];
    let output = {
      predictedCharacterNames: ['Bob']
    };
    expect(preSnippetsAnalyzer(input)).to.deep.equal(output);
  });

  it(`doesn't include repeats`, function () {
    let input = [new PreSnippet('Bob says hi to Bob.', 'narration')];
    let output = {
      predictedCharacterNames: ['Bob']
    };
    expect(preSnippetsAnalyzer(input)).to.deep.equal(output);
  });

});//end describe('bookStorageFormat'
































