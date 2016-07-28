"use strict";
const expect = require('chai').expect;
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const buildCustomLexicon = require('../src/buildCustomLexicon');


describe('buildCustomLexicon', () => {
  it(`adds only available characters without default pronouns, and empty verbList`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore')];
    expect(buildCustomLexicon(characterList, [], false))
    .to.deep.equal({'Albus Dumbledore': 'PERSON_CONFIRMED'});
  });

  it(`adds aliases without default pronouns`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore', ['Albus'])];
    expect(buildCustomLexicon(characterList, [], false))
    .to.deep.equal({'Albus Dumbledore': 'PERSON_CONFIRMED', 'Albus': 'PERSON_CONFIRMED'});
  });

  it(`added displayname, aliases, and pronouns`, function () {
    let characterList = [
      new CharacterProfile('Albus Dumbledore', ['Albus']),
      new CharacterProfile('Harry Potter', ['Harry']),
    ];
    expect(buildCustomLexicon(characterList, []))
    .to.deep.equal({
      'Harry Potter': 'PERSON_CONFIRMED',
      'Albus Dumbledore': 'PERSON_CONFIRMED',
      'Harry': 'PERSON_CONFIRMED',
      'Albus': 'PERSON_CONFIRMED',
      'he': 'PERSON_PRONOUN',
      'she': 'PERSON_PRONOUN'
    });
  });

});//end describe('buildCustomLexicon'
































