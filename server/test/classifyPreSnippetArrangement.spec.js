'use strict';
const expect = require('chai').expect;
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');
const ltt = require('../constants/lexiconTagTypes');
const quoteify = (str) => `“${str}”`;
const NAR_PC_VSS = `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PC = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_CONFIRMED})`;
const NAR_PR_VSS = `NAR(${ltt.PERSON_PRONOUN} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PR = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_PRONOUN})`;
const SP = ltt.SPEECH
const M_NL = ltt.WS_MULTI_NEWLINE
const WS_SS = ltt.WS_SINGLE_SPACE

describe('classifyPreSnippetArrangement', () => {
  it('exists as a function', function () {
    expect(typeof classifyPreSnippetArrangement).to.equal('function');
  });
  let count, preSnippetList, nlp;
  const QUANTITY_TO_GRAB_EACH_SIDE = 6;
  beforeEach(() => {
    count = 0;
    preSnippetList = [
      /* 0 */  new PreSnippet(`PROLOGUE`, 'narration', ++count),
      /* 1 */  new PreSnippet(`\n\n\n`, 'whitespace', ++count),
      /* 2 */  new PreSnippet(quoteify(`We should start back,`), 'speech', ++count),
      /* 3 */  new PreSnippet(' ', 'whitespace', ++count),
      /* 4 */  new PreSnippet(`Gared urged as the woods began to grow dark around them.`, 'narration', ++count),
      /* 5 */  new PreSnippet(`\n\n`, 'whitespace', ++count),
      /* 6 */  new PreSnippet(quoteify(`The wildlings are dead.`), 'speech', ++count),
      /* 7 */  new PreSnippet(`\n\n`, 'whitespace', ++count),
      /* 8 */  new PreSnippet(quoteify(`Do the dead frighten you?`), 'speech', ++count),
      /* 9 */  new PreSnippet(' ', 'whitespace', ++count),
      /* 10 */ new PreSnippet(`Ser Waymar Royce asked with just the hint of a smile.`, 'narration', ++count),
      /* 11 */ new PreSnippet(`\n\n`, 'whitespace', ++count),
      /* 12 */ new PreSnippet(`Gared did not rise to the bait. He was an old man, past fifty, and he had seen the lordlings come and go.`, 'narration', ++count),
      /* 13 */ new PreSnippet(' ', 'whitespace', ++count),
      /* 14 */ new PreSnippet(quoteify(`Dead is dead,`), 'speech', ++count),
      /* 15 */ new PreSnippet(' ', 'whitespace', ++count),
      /* 16 */ new PreSnippet(`he said.`, 'narration', ++count),
      /* 17 */ new PreSnippet(' ', 'whitespace', ++count),
      /* 18 */ new PreSnippet(quoteify(`We have no business with the dead.`), 'speech', ++count),
    ];
  });


  let someLex, someLex2;
  it(`WSMNL WSsingle, nar blank, nar PSS VSS, speech`, function () {
    const preSnippetIdSpeechSelected = 2;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    const OUTPUT = {
      arrangementComplete: `NAR(),${ltt.WS_MULTI_NEWLINE}|${ltt.WS_SINGLE_SPACE},NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE}),${ltt.WS_MULTI_NEWLINE},${ltt.SPEECH},${ltt.WS_MULTI_NEWLINE},${ltt.SPEECH}`,
    };
    someLex = buildCustomLexicon([new CharacterProfile('Gared')], ['urged'])
    expect(
      classifyPreSnippetArrangement(preSnippetExtendedObj, someLex)
    ).to.deep.equal(OUTPUT)
  });
  it(`dickin around`, function () {
    let list = [
      new PreSnippet(`“So cool”`, 'narration', 0),
      new PreSnippet(` `, 'whitespace', 1),
      new PreSnippet(`Bob pointed out.`, 'narration', 2),
      new PreSnippet(` `, 'whitespace', 3),
      new PreSnippet(`“No way”`, 'speech', 4),
    ]
    someLex2 = buildCustomLexicon([new CharacterProfile('Bob')], ['pointed out'])
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, 0, QUANTITY_TO_GRAB_EACH_SIDE);
    let res = classifyPreSnippetArrangement(
      preSnippetExtendedObj, someLex2)
  });

  it('PERSON PRONOUN - just arrangementComplete', () => {
    // const preSnippetIdSpeechSelected = 14;
    // let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    // const OUTPUT = {
    //   arrangementComplete: `NAR(),${WS_SS}|${WS_SS},${NAR_PR_VSS},${WS_SS}`,
    // };
    // console.log('as', classifyPreSnippetArrangement(preSnippetExtendedObj, buildCustomLexicon([], ['said'])).arrangementComplete);
    // expect(
    //   classifyPreSnippetArrangement(preSnippetExtendedObj, buildCustomLexicon())
    // ).to.deep.equal(OUTPUT)
  })
});//end describe('classifyPreSnippetArrangement'




























