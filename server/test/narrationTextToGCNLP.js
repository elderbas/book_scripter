// googleNameSuggestion.js

'use strict';
const expect = require('chai').expect;
let CharacterProfile = require('../src/classes/CharacterProfile')
let PreSnippet = require('../src/classes/PreSnippet')
let grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets')
let classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement')
const quoteify = (str) => `“${str}”`;
let nTTG = require('../src/narrationTextToGCNLP');
describe('!--googleNameSuggestion--!', () => {
  it('exists as a function', function () {
    expect(typeof gNS).to.equal('function');
  });

  let count, preSnippetList, QUANTITY_TO_GRAB_EACH_SIDE = 6;
  beforeEach(() => {
    count = 0
    preSnippetList = [
      /*0*/new PreSnippet(`PROLOGUE`, 'narration', ++count),
      /*1*/new PreSnippet(`\n\n\n`, 'whitespace', ++count),
      /*2*/new PreSnippet(quoteify(`We should start back,`), 'speech', ++count),
      /*3*/new PreSnippet(' ', 'whitespace', ++count),
      /*4*/new PreSnippet(`Gared urged as the woods began to grow dark around them.`, 'narration', ++count),
      /*5*/new PreSnippet(`\n\n`, 'whitespace', ++count),
      /*6*/new PreSnippet(quoteify(`The wildlings are dead.`), 'speech', ++count),
      /*7*/new PreSnippet(`\n\n`, 'whitespace', ++count),
      /*8*/new PreSnippet(quoteify(`Do the dead frighten you?`), 'speech', ++count),
      /*9*/new PreSnippet(' ', 'whitespace', ++count),
      /*10*/new PreSnippet(`Ser Waymar Royce asked with just the hint of a smile.`, 'narration', ++count),
      /*11*/new PreSnippet(`\n\n`, 'whitespace', ++count),
      /*12*/new PreSnippet(`Gared did not rise to the bait. He was an old man, past fifty, and he had seen the lordlings come and go.`, 'narration', ++count),
      /*13*/new PreSnippet(' ', 'whitespace', ++count),
      /*14*/new PreSnippet(quoteify(`Dead is dead,`), 'speech', ++count),
      /*15*/new PreSnippet(' ', 'whitespace', ++count),
      /*16*/new PreSnippet(`he said.`, 'narration', ++count),
      /*17*/new PreSnippet(' ', 'whitespace', ++count),
      /*18*/new PreSnippet(quoteify(`We have no business with the dead.`), 'speech', ++count),
      /*19*/new PreSnippet(`\n\n`, 'whitespace', ++count),
      /*20*/new PreSnippet(quoteify(`Are they dead?`), 'speech', ++count),
      /*21*/new PreSnippet(` `, 'whitespace', ++count),
      /*22*/new PreSnippet(`Royce asked softly.`, 'narration', ++count),
      /*23*/new PreSnippet(` `, 'whitespace', ++count),
      /*24*/new PreSnippet(quoteify(`What proof have we?`), 'whitespace', ++count),
    ];
  })

  it(`1 entity - 1 'person', 50+ salience, NSUBJ`, function () {
    const preSnippetIdSpeechSelected = 14;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, undefined, true);
    const mockGoogleResponse = {
      entities: { people: [ {name: 'Ned', salience: 65.123} ], },
      tokens: [{
        text: {content: 'Ned'},
        dependencyEdge: {label: 'NSUBJ'}
      }]
    }
    expect(
      nTTG(classifiedPreSnippetArrangementObj.nonSingleSpaceArrangement, preSnippetExtendedObj.nonSingleSpace, mockGoogleResponse)
    ).to.deep.equal('Ned')
  });
});//end describe('createPreSnippetsFromTextBlob'




































