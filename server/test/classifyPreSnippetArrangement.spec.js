'use strict';
const expect = require('chai').expect;
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');
const ltt = require('../constants/lexiconTagTypes');
const quoteify = (str) => `“${str}”`;

describe('classifyPreSnippetArrangement', () => {
  it('exists as a function', function () {
    expect(typeof classifyPreSnippetArrangement).to.equal('function');
  });
  let count, preSnippetList, nlp;
  const QUANTITY_TO_GRAB_EACH_SIDE = 6;
  beforeEach(() => {
    nlp = require('nlp_compromise');
    nlp.lexicon(
      buildCustomLexicon([new CharacterProfile('Gared')], ['urged'])
    );
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



  it(`WSMNL WSsingle, nar blank, nar PSS VSS, speech`, function () {
    const preSnippetIdSpeechSelected = 2;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    const OUTPUT = {
      nonWhiteSpaceArrangement: `NAR()|NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE}),${ltt.SPEECH},${ltt.SPEECH}`,
      arrangementComplete: `NAR(),${ltt.WS_MULTI_NEWLINE}|${ltt.WS_SINGLE_SPACE},NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE}),${ltt.WS_MULTI_NEWLINE},${ltt.SPEECH},${ltt.WS_MULTI_NEWLINE},${ltt.SPEECH}`,
      nonSingleSpaceArrangement: `NAR(),WS_MULTI_NEWLINE|NAR(PERSON_CONFIRMED VERB_SYNONYM_TO_SPOKE),WS_MULTI_NEWLINE,SPEECH,WS_MULTI_NEWLINE,SPEECH`
    };

    expect(
      classifyPreSnippetArrangement(preSnippetExtendedObj, nlp)
    ).to.deep.equal(OUTPUT)
  });



});//end describe('classifyPreSnippetArrangement'




























