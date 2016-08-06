"use strict";
const expect = require('chai').expect;
const CharacterProfile = require('../../src/classes/CharacterProfile');


describe('CharacterProfile', () => {
  it(`adds displayName`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore');
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: []
    });
  });

  it(`adds aliases`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore', ['Albus']);
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: ['Albus']
    });
  });

  it(`may have a single string value for initial alias instead of array`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore', 'Albus');
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: ['Albus']
    });
  });

});//end describe('CharacterProfile'
































