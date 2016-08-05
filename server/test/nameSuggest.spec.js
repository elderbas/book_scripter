'use strict';
const expect = require('chai').expect;
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');
const nameSuggest = require('../src/nameSuggest');

const quoteify = (str) => `“${str}”`;
describe('nameSuggest', () => {
  it('exists as a function', function () {
    expect(typeof nameSuggest).to.equal('function');
  });
  let nlp;
  let count, preSnippetList;
  const QUANTITY_TO_GRAB_EACH_SIDE = 6;
  beforeEach(() => {
    nlp = require('nlp_compromise');
    count = 0;
    preSnippetList = [
      new PreSnippet(`PROLOGUE`, 'narration', ++count),
      new PreSnippet(`\n\n\n`, 'whitespace', ++count),
      new PreSnippet(quoteify(`We should start back,`), 'speech', ++count),
      new PreSnippet(' ', 'whitespace', ++count),
      new PreSnippet(`Gared urged as the woods began to grow dark around them.`, 'narration', ++count),
      new PreSnippet(`\n\n`, 'whitespace', ++count),
      new PreSnippet(quoteify(`The wildlings are dead.`), 'speech', ++count),
      new PreSnippet(`\n\n`, 'whitespace', ++count),
      new PreSnippet(quoteify(`Do the dead frighten you?`), 'speech', ++count),
      new PreSnippet(' ', 'whitespace', ++count),
      new PreSnippet(`Ser Waymar Royce asked with just the hint of a smile.`, 'narration', ++count),
      new PreSnippet(`\n\n`, 'whitespace', ++count),
      new PreSnippet(`Gared did not rise to the bait. He was an old man, past fifty, and he had seen the lordlings come and go.`, 'narration', ++count),
      new PreSnippet(' ', 'whitespace', ++count),
      new PreSnippet(quoteify(`Dead is dead,`), 'speech', ++count),
      new PreSnippet(`he said.`, 'narration', ++count),
      new PreSnippet(' ', 'whitespace', ++count),
      new PreSnippet(quoteify(`We have no business with the dead.`), 'speech', ++count),
    ];
  });



  it(`simple to right`, function () {
    const preSnippetIdSpeechSelected = 2;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    nlp.lexicon(
      buildCustomLexicon([new CharacterProfile('Gared')], ['urged'])
    );
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, nlp);
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
    ).to.deep.equal('gared')
  });

  it(`simple to left`, function () {
    const preSnippetIdSpeechSelected = 6;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    nlp.lexicon(
      buildCustomLexicon([new CharacterProfile('Gared')], ['urged'])
    );
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, nlp);
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
    ).to.deep.equal('gared')
  });




});//end describe('classifyPreSnippetArrangement'




























