"use strict";
let expect = require('chai').expect;
let uF = require('../utilityFunks');


describe('utilityFunks', () => {
  it('exists as an object', function () {
    expect(typeof uF).to.equal('object');
    expect(Array.isArray(uF)).to.not.equal('array');
  });

  describe('extractFileName', () => {
    it(`simple file name extraction`, function () {
      expect(uF.extractFileName('textBook.txt')).to.equal('textBook');
    });

    it(`returns whole name if no extension`, function () {
      expect(uF.extractFileName('textBook')).to.equal('textBook');
    });
  })



});//end describe('bookStorageFormat'



























