"use strict";
const expect = require('chai').expect;
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const buildCustomLexicon = require('../src/buildCustomLexicon');

/*
* all string values in keys added to the lexicon need to be lowercase
* */
describe('buildCustomLexicon', () => {
  it(`adds only available characters without default pronouns, and empty verbList`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore')];
    expect(buildCustomLexicon(characterList, [], false))
    .to.deep.equal({'albus dumbledore': 'PERSON_CONFIRMED'});
  });

  it(`adds aliases without default pronouns`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore', ['Albus'])];
    let output = {'albus dumbledore': 'PERSON_CONFIRMED', 'albus': 'PERSON_CONFIRMED'};
    expect(buildCustomLexicon(characterList, [], false)).to.deep.equal(output);
  });

  it(`adds aliases without default pronouns`, function () {
    let characterList = [new CharacterProfile('Bob', 'Killa')];
    let output = { 'bob': 'PERSON_CONFIRMED', 'killa': 'PERSON_CONFIRMED' };
    expect(buildCustomLexicon(characterList, [], false)).to.deep.equal(output);
  });

  it(`automatically adds a 'had spoken' verb types to make parsing easier`, function () {
    let output = {
      'asked': 'VERB_SYNONYM_TO_SPOKE',
      'had asked': 'VERB_SYNONYM_TO_SPOKE',
      'said': 'VERB_SYNONYM_TO_SPOKE',
      'had said': 'VERB_SYNONYM_TO_SPOKE'
    };
    expect(buildCustomLexicon([], ['asked', 'said'], false)).to.deep.equal(output);
  });

  it(`added displayname, aliases, and pronouns`, function () {
    let characterList = [
      new CharacterProfile('Albus Dumbledore', ['Albus']),
      new CharacterProfile('Harry Potter', ['Harry']),
    ];
    let output = {
      'harry potter': 'PERSON_CONFIRMED',
      'albus dumbledore': 'PERSON_CONFIRMED',
      'harry': 'PERSON_CONFIRMED',
      'albus': 'PERSON_CONFIRMED',
      'he': 'PERSON_PRONOUN',
      'she': 'PERSON_PRONOUN'
    };
    expect(buildCustomLexicon(characterList)).to.deep.equal(output);
  });

});//end describe('buildCustomLexicon'
































