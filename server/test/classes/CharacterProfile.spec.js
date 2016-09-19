"use strict";
const expect = require('chai').expect;
const CharacterProfile = require('../../src/classes/CharacterProfile');


describe('CharacterProfile', () => {
  it(`adds displayName`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore', [], 0);
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: [],
      id: 0
    });
  });

  it(`adds aliases`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore', ['Albus'], 0);
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: ['Albus'],
      id: 0
    });
  });

  it(`may have a single string value for initial alias instead of array`, function () {
    let characterList = new CharacterProfile('Albus Dumbledore', 'Albus', 0);
    expect(characterList).to.deep.equal({
      displayName: 'Albus Dumbledore',
      aliases: ['Albus'],
      id: 0
    });
  });

});//end describe('CharacterProfile'
































