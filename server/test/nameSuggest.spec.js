'use strict';
const expect = require('chai').expect;
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const buildCustomLexicon = require('../src/buildCustomLexicon');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const grabExtendingPreSnippets = require('../src/grabExtendingPreSnippets');
const nameSuggest = require('../src/nameSuggest');
const _ = require('lodash');
var reload = require('require-reload')(require);
let nlp = require('nlp_compromise');
const quoteify = (str) => `“${str}”`;
describe('!--nameSuggest--!', () => {
  it('exists as a function', function () {
    expect(typeof nameSuggest).to.equal('function');
  });
  let count, preSnippetList;
  const QUANTITY_TO_GRAB_EACH_SIDE = 6;
  beforeEach(() => {

    count = 0;
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
    ];
  });

  it(`null if nothing to suggest`, function () {
    const preSnippetIdSpeechSelected = 2;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    let customLex = buildCustomLexicon([new CharacterProfile('Charlie')], ['urged']);

    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
    let output = null;
    // let output = 'a';
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
    ).to.deep.equal(output)
  });

  it(`simple to right`, function () {
    const preSnippetIdSpeechSelected = 2;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    let customLex = buildCustomLexicon([new CharacterProfile('Gared')], ['urged']);
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
    let output = {suggestedName:'gared'};
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj).suggestedName
    ).to.deep.equal(output.suggestedName)
  });

  it(`simple to left`, function () {
    const preSnippetIdSpeechSelected = 6;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    let customLex = buildCustomLexicon([new CharacterProfile('Gared')], ['urged']);
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
    let output = {suggestedName:'gared'};
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj).suggestedName
    ).to.deep.equal(output.suggestedName)
  });

  // “Dead is dead,” he said. “We have no business with the dead.”
  it(`pronoun wrapped end grabs from just previous speech person confirmed`, function () {
    const preSnippetIdSpeechSelected = 18;
    let preSnippetExtendedObj = grabExtendingPreSnippets(preSnippetList, preSnippetIdSpeechSelected, QUANTITY_TO_GRAB_EACH_SIDE);
    // act as if user already confirmed gared in speech before 'pronoun vss'
    let speechPreSnippetToChangePersonConfirmed = _.find(preSnippetExtendedObj.allExtended[0], (s) => s.text === '“Dead is dead,”');
    speechPreSnippetToChangePersonConfirmed.personConfirmedNormalized = 'gared';

    let customLex = buildCustomLexicon([new CharacterProfile('Gared')], ['said']);
    let classifiedPreSnippetArrangementObj = classifyPreSnippetArrangement(preSnippetExtendedObj, customLex);
    let output = {suggestedName:'gared', whichMatcher: 'pronounWrappedEndGrabsFromJustPreviousConfirmed'};
    expect(
      nameSuggest(classifiedPreSnippetArrangementObj, preSnippetExtendedObj)
    ).to.deep.equal(output)
  });

});//end describe('nameSuggest'




























