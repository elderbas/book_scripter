'use strict';
const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const classifyPreSnippetArrangement = require('../src/classifyPreSnippetArrangement');
const PreSnippet = require('../src/classes/PreSnippet');
const CharacterProfile = require('../src/classes/CharacterProfile');
const quoteify = (str) => `“${str}”`;
describe('classifyPreSnippetArrangement', () => {
  let count = 0;
  let preSnippetList = [
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
  deepFreeze(preSnippetList);
  it('exists as a function', function () {
    expect(typeof classifyPreSnippetArrangement).to.equal('function');
  });
  //
  // it(``, function () {
  //   let indexSelected = 2;
  //   let characterList = [new CharacterProfile('Gared')];
  //   const LEFT = 0, RIGHT = 1;
  //   if (blah[RIGHT][0] === 'PC VSS' || blah[RIGHT][0] === 'VSS PC') {
  //
  //   }
  //   else if (blah[LEFT][0] === 'PC VSS' || blah[LEFT][0] === 'VSS PC') {
  //
  //   }
  //   let output = [[], []];
  //
  //   expect(
  //     classifyPreSnippetArrangement(indexSelected, preSnippetList)
  //   ).to.deep.equal()
  // });



});//end describe('classifyPreSnippetArrangement'