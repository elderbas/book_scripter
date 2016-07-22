"use strict";
let expect = require('chai').expect;
let extractRunningCapitalWords = require('../src/extractRunningCapitalWords.js');

describe('extractRunningCapitalWords', () => {
  it('exists as a function', function () {
    expect(typeof extractRunningCapitalWords).to.equal('function');
  });

  it('extracts a single word cap', function () {
    expect(extractRunningCapitalWords('Bob')).to.deep.equal(['Bob']);
  });

  it('extracts multiple separate cap word expressions', function () {
    expect(extractRunningCapitalWords('Bob walked, but he saw Jane.')).to.deep.equal(['Bob', 'Jane']);
    expect(extractRunningCapitalWords('Bob, do not see Jane.')).to.deep.equal(['Bob', 'Jane']);
    expect(extractRunningCapitalWords('Bob. Jane is not here.')).to.deep.equal(['Bob', 'Jane']);
    expect(extractRunningCapitalWords('Bob, Jane is not here.')).to.deep.equal(['Bob', 'Jane']);
  });

  it('extracts a multi word name as one', function () {
    expect(extractRunningCapitalWords('Bob Jones, he saw a cat.')).to.deep.equal(['Bob Jones']);
    expect(extractRunningCapitalWords('Bob Jones saw a cat.')).to.deep.equal(['Bob Jones']);
  });

  it('isnt fooled by common pronouns', function () {
    expect(extractRunningCapitalWords('Bob Jones. He is cool.')).to.deep.equal(['Bob Jones']);
    expect(extractRunningCapitalWords('Bob and Jane. They are cool.')).to.deep.equal(['Bob','Jane']);
  });

  it('less common punctuation marks break in running name', () => {
    expect(extractRunningCapitalWords('Bob Jones - He is cool.')).to.deep.equal(['Bob Jones']);
    expect(extractRunningCapitalWords('Bob and Jane: They are cool.')).to.deep.equal(['Bob','Jane']);
    expect(extractRunningCapitalWords('Bob Jones: he is cool.')).to.deep.equal(['Bob Jones']);
    expect(extractRunningCapitalWords('Bob Jones; They are cool.')).to.deep.equal(['Bob Jones']);
  });


});//end describe('bookStorageFormat'
































