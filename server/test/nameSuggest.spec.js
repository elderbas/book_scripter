'use strict';
const expect = require('chai').expect;
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');
const nameSuggest = require('../src/nameSuggest');
const _ = require('lodash');
const quoteify = (str) => `“${str}”`;
describe('!--nameSuggest--!', () => {
  it('exists as a function', function () {
    expect(typeof nameSuggest).to.equal('function');
  });
  describe('pre snippet list 1', () => {
    let count, preSnippetList;
    const QUANTITY_TO_GRAB_EACH_SIDE = 6;
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

    });

    it(`null if nothing to suggest`, function () {
      const preSnippetIdSpeechSelected = 2;
      let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
      let customLex = buildCustomLexicon([new CharacterProfile('Charlie')], ['urged']);

      let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let output = null;
      expect(
        nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
      ).to.deep.equal(output)
    });

    it(`indicatorJustToRight`, function () {
      const preSnippetIdSpeechSelected = 2;
      let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
      let customLex = buildCustomLexicon([new CharacterProfile('Gared')], ['urged']);

      let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let output = {suggestedName:'gared'};
      let res = nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
      expect(res.suggestedName).to.deep.equal(output.suggestedName)
    });

    it(`indicatorJustToLeft`, function () {
      const preSnippetIdSpeechSelected = 24;
      let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
      let customLex = buildCustomLexicon([new CharacterProfile('Royce')], ['asked']);

      let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let output = {suggestedName:'royce'};
      let res = nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
      expect(res.suggestedName).to.deep.equal(output.suggestedName)
    });
  })//end describe('pre snippet list 1'

  describe('pre snippet list 2', () => {
    let preSnipsLotsInfers, count, QUANTITY_TO_GRAB_EACH_SIDE = 6;
    beforeEach(() => {
      count = 0
      preSnipsLotsInfers = [
        /* 0 */new PreSnippet(`“Did you see any blood?”`, 'speech', count++),
        /* 1 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 2 */new PreSnippet(`“Well, no,”`, 'speech', count++),
        /* 3 */new PreSnippet(` `, 'whitespace', count++),
        /* 4 */new PreSnippet(`Will admitted.`, 'narration', count++),
        /* 5 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 6 */new PreSnippet(`“Did you see any weapons?”`, 'speech', count++),
        /* 7 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 8 */new PreSnippet(`“Some swords, a few bows. One man had an axe. Heavy-looking, double-bladed, a cruel piece of iron. It was on the ground beside him, right by his hand.”`, 'speech', count++),
        /* 9 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 10 */new PreSnippet(`“Did you make note of the position of the bodies?”`, 'speech', count++),
        /* 11 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 12 */new PreSnippet(`Will shrugged.`, 'narration', count++),
        /* 13 */new PreSnippet(` `, 'whitespace', count++),
        /* 14 */new PreSnippet(`“A couple are sitting up against the rock. Most of them on the ground. Fallen, like.”`, 'speech', count++),
        /* 15 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 16 */new PreSnippet(`“Or sleeping,”`, 'speech', count++),
        /* 17 */new PreSnippet(` `, 'whitespace', count++),
        /* 18 */new PreSnippet(`Royce suggested.`, 'narration', count++),
        /* 19 */new PreSnippet(`\n\n`, 'whitespace', count++),
        /* 20 */new PreSnippet(`“Fallen,”`, 'speech', count++),
        /* 21 */new PreSnippet(` `, 'whitespace', count++),
        /* 22 */new PreSnippet(`Will insisted.`, 'narration', count++),
        /* 23 */new PreSnippet(` `, 'whitespace', count++),
        /* 24 */new PreSnippet(`“There’s one woman up an ironwood, half-hid in the branches. A far-eyes.”`, 'speech', count++),
        /* 25 */new PreSnippet(` `, 'whitespace', count++),
        /* 26 */new PreSnippet(`He smiled thinly.`, 'narration', count++),
        /* 27 */new PreSnippet(` `, 'whitespace', count++),
        /* 28 */new PreSnippet(`“I took care she never saw me. When I got closer, I saw that she wasn’t moving neither.”`, 'speech', count++),
        /* 29 */new PreSnippet(` `, 'whitespace', count++),
        /* 30 */new PreSnippet(`Despite himself, he shivered.`, 'narration', count++),
        /* 31 */new PreSnippet(`\n\n`, 'whitespace', count++),
      ]
    })

    it(`alternatingSpeechABA`, function () {
      // these would have been set already by user
      preSnipsLotsInfers[6].personConfirmedNormalized = 'royce'
      preSnipsLotsInfers[8].personConfirmedNormalized = 'will'
      const preSnippetIdSpeechSelected = 10;
      let preSnippetExtendedObj = grabExtendingPreSnippets(preSnipsLotsInfers, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
      let customLex = buildCustomLexicon([new CharacterProfile('Royce')], ['asked']);
      let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
      let output = {suggestedName:'royce'};
      let res = nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
      expect(res.suggestedName).to.equal(output.suggestedName)
    });
  })//end describe('pre snippet list 2', () => {
});//end describe('nameSuggest'






























