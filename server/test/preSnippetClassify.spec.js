"use strict";
const expect = require('chai').expect;
const nlp = require('nlp_compromise');
const preSnippetClassify = require('../src/preSnippetClassify');
const PreSnippet = require('../src/classes/PreSnippet');
const lexiconTagTypes = require('../constants/lexiconTagTypes');


describe('preSnippetClassify', () => {
  let customLexicon;
  beforeEach(() => {
    customLexicon = nlp.lexicon();
  });

  it('exists as a function', function () {
    expect(typeof preSnippetClassify).to.equal('function');
  });

  it(`single sentence VSS PC`, function () {
    let characterList = [
      {displayName: 'Harry Potter', aliases: ['Harry']},
      {displayName: 'Albus Dumbledore', aliases: ['Dumbledore']}
    ];
    let indexSpeechSelected = 0;
    customLexicon['dumbledore'] = lexiconTagTypes.PERSON_CONFIRMED;
    customLexicon['asked'] = lexiconTagTypes.VERB_SYNONYM_TO_SPOKE;

    let input = new PreSnippet(`asked Dumbledore.`, 'narration', 13);
    let output = 'VERB_SYNONYM_TO_SPOKE PERSON_CONFIRMED';
    expect(preSnippetClassify(input, customLexicon)).to.deep.equal(output);
  });

  it(`pronoun sentence PC VSS`, function () {
    let characterList = [
      {displayName: 'Harry Potter', aliases: ['Harry']},
      {displayName: 'Albus Dumbledore', aliases: ['Dumbledore']}
    ];
    let indexSpeechSelected = 0;
    customLexicon['asked'] = lexiconTagTypes.VERB_SYNONYM_TO_SPOKE;
    customLexicon['he'] = lexiconTagTypes.PERSON_PRONOUN;

    let input = new PreSnippet(`he asked.`, 'narration', 13);
    let output = 'PERSON_CONFIRMED VERB_SYNONYM_TO_SPOKE';
    expect(preSnippetClassify(input, customLexicon)).to.deep.equal(output);
  });

});//end describe('bookStorageFormat'
































