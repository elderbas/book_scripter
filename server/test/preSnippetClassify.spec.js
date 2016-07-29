"use strict";
const expect = require('chai').expect;
const preSnippetClassify = require('../src/preSnippetClassify');
const PreSnippet = require('../src/classes/PreSnippet');
const lexiconTagTypes = require('../constants/lexiconTagTypes');
const buildCustomLexicon = require('../src/buildCustomLexicon');


describe('preSnippetClassify', () => {
  it('exists as a function', function () {
    expect(typeof preSnippetClassify).to.equal('function');
  });

  describe('narration type', () => {
    let charList, inputPreSnippet;
    beforeEach(() => {
      charList = [
        {displayName: 'Harry Potter', aliases: ['Harry', 'Mr. Potter']},
        {displayName: 'Albus Dumbledore', aliases: ['Albus', 'Professor Dumbledore']}
      ];
      inputPreSnippet = new PreSnippet(null, 'narration', 13); // null to be set later
    });

    it(`single sentence VSS PC`, function () {
      inputPreSnippet.text = 'asked Harry.';
      let output = 'VERB_SYNONYM_TO_SPOKE PERSON_CONFIRMED';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon(charList, ['asked']))
      ).to.deep.equal(output);
    });

    it(`single sentence PC VSS`, function () {
      inputPreSnippet.text = `Harry asked.`;
      let output = 'PERSON_CONFIRMED VERB_SYNONYM_TO_SPOKE';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon(charList, ['asked']))
      ).to.deep.equal(output);
    });

    it(`single sentence PC VSS`, function () {
      inputPreSnippet.text =`Harry asked.`;
      let output = 'PERSON_CONFIRMED VERB_SYNONYM_TO_SPOKE';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon(charList, ['asked']))
      ).to.deep.equal(output);
    });

    it(`only grabs first two out of a narration snippet even if more are available`, function () {
      inputPreSnippet.text =`Harry asked. Then Harry walked away.`;
      let output = 'PERSON_CONFIRMED VERB_SYNONYM_TO_SPOKE';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon(charList, ['asked']))
      ).to.deep.equal(output);
    });

    it(`maintains order of tags being added even if not directly after each other`, function () {
      inputPreSnippet.text = `asked softly by Harry.`;
      let output = 'VERB_SYNONYM_TO_SPOKE PERSON_CONFIRMED';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon(charList, ['asked']))
      ).to.deep.equal(output);
    });

    it(`pronoun sentence PP VSS`, function () {
      inputPreSnippet.text = `he asked.`;
      let output = 'PERSON_PRONOUN VERB_SYNONYM_TO_SPOKE';
      expect(
        preSnippetClassify(inputPreSnippet, buildCustomLexicon([], ['asked']))
      ).to.deep.equal(output);
    });
  });

  describe(`white space type`, () => {
    let inputPreSnippet;
    beforeEach('', () => {
      inputPreSnippet = new PreSnippet(null, 'whitespace', 0);
    });

    it(`single space`, () => {
      inputPreSnippet.text = ` `;
      let output = 'WS_SINGLE_SPACE';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

    it(`multi spaces`, () => {
      inputPreSnippet.text = `   `;
      let output = 'WS_MULTI_SPACE';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

    it(`single newline`, () => {
      inputPreSnippet.text = `\n`;
      let output = 'WS_SINGLE_NEWLINE';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

    it(`multi newline`, () => {
      inputPreSnippet.text = `\n\n\n`;
      let output = 'WS_MULTI_NEWLINE';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

    it(`mixed space`, () => {
      inputPreSnippet.text = `\n \n `;
      let output = 'WS_MIXED_WS';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

    it(`non space type present`, () => {
      inputPreSnippet.text = `a\nb`;
      let output = 'WS_NON_WS';
      expect(preSnippetClassify(inputPreSnippet)).to.deep.equal(output);
    });

  });
});//end describe('preSnippetClassify'
































