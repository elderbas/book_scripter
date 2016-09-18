"use strict";
const expect = require('chai').expect;
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const _ = require('lodash')

/*
* all string values in keys added to the lexicon need to be lowercase
* */
describe('buildCustomLexicon', () => {
  it(`adds only available characters without default pronouns, and empty verbList`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore')];
    let res = buildCustomLexicon(characterList, [], false)
    expect(res['albus dumbledore']).to.equal('PERSON_CONFIRMED')
  });

  it(`adds aliases without default pronouns`, function () {
    let characterList = [new CharacterProfile('Albus Dumbledore', ['Albus'])];
    let res = buildCustomLexicon(characterList, [], false)
    expect(res['albus dumbledore']).to.equal('PERSON_CONFIRMED');
    expect(res['albus']).to.equal('PERSON_CONFIRMED');
  });

  it(`adds aliases without default pronouns`, function () {
    let res = buildCustomLexicon([new CharacterProfile('Bob', 'Killa')], [], false)
    expect(res['bob']).to.equal('PERSON_CONFIRMED');
    expect(res['killa']).to.equal('PERSON_CONFIRMED');
  });

  it(`automatically adds a 'had spoken' verb types to make parsing easier`, function () {
    let output = {
      'asked': 'VERB_SYNONYM_TO_SPOKE',
      'had asked': 'VERB_SYNONYM_TO_SPOKE',
      'said': 'VERB_SYNONYM_TO_SPOKE',
      'had said': 'VERB_SYNONYM_TO_SPOKE'
    };
    let res = buildCustomLexicon([], ['asked', 'said'], false)
    _.forEach(output, (tagType, lexiconKey) => expect(res[lexiconKey]).to.equal(tagType))
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
    let res = buildCustomLexicon(characterList)
    _.forEach(output, (tagType, lexiconKey) => expect(res[lexiconKey]).to.equal(tagType))
  });

});//end describe('buildCustomLexicon'
































