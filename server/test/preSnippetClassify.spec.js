"use strict";
const expect = require('chai').expect;
const nlp = require('nlp_compromise');
const preSnippetClassify = require('../src/preSnippetClassify');
const PreSnippet = require('../src/classes/PreSnippet');
const lexiconTagTypes = require('../constants/lexiconTagTypes');
const buildCustomLexicon = require('../src/buildCustomLexicon');


describe('preSnippetClassify', () => {
  let customLexicon;
  beforeEach(() => {
    customLexicon = nlp.lexicon();
  });

  it('exists as a function', function () {
    expect(typeof preSnippetClassify).to.equal('function');
  });

  it(`single sentence VSS PC`, function () {
    let charList = [
      {displayName: 'Harry Potter', aliases: ['Harry']},
      {displayName: 'Albus Dumbledore', aliases: ['Dumbledore']}
    ];

    let input = new PreSnippet(`asked Dumbledore`, 'narration', 13);
    let output = 'VERB_SYNONYM_TO_SPOKE PERSON_CONFIRMED';
    expect(
      preSnippetClassify(input, buildCustomLexicon(charList, ['asked']))
    ).to.deep.equal(output);
  });

  it(`pronoun sentence PC VSS`, function () {
    let input = new PreSnippet(`he asked.`, 'narration', 13);
    let output = 'PERSON_PRONOUN VERB_SYNONYM_TO_SPOKE';
    expect(
      preSnippetClassify(input, buildCustomLexicon([], ['asked']))
    ).to.deep.equal(output);
  });

});//end describe('preSnippetClassify'
































