'use strict';
let expect = require('chai').expect;
let Stream = require('../src/classes/Stream.js');

describe('Stream', () => {
  let stream;
  it('exists as a function', function () {
    expect(typeof Stream).to.equal('function');
  });

  it(`initializes properties on intantiation`, () => {
    expect(new Stream().openCharIndex).to.not.equal(undefined);
    expect(new Stream().closeCharIndex).to.not.equal(undefined);
    expect(new Stream().type).to.not.equal(undefined);
  });
});//end describe('bookStorageFormat'
































