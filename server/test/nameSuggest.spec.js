// "use strict";
// let expect = require('chai').expect;
// let predictedNamesByParse = require('../src/predictedNamesByParse.js');
// let nameSuggest = require('../src/nameSuggest.js');
// let nlp = require('nlp_compromise');
// let PreSnippet = require('../src/classes/PreSnippet');
// let NameSuggestion = require('../src/classes/NameSuggestion');
//
// /*
// *
// * shorthands
// * SP - Speech type PreSnippet,
// * WS - Whitespace type PreSnippet
// * () after WS - S - single space,
// * NAR - Narration type PreSnippet
// * () after NAr - VSS - VerbSaidSynonym,
// *                P - PersonConfirmed
// * */
//
// describe('nameSuggest', () => {
//   let customLexicon;
//   beforeEach(() => {
//     customLexicon = nlp.lexicon();
//   });
//
//   it('exists as a function', function () {
//     expect(typeof nameSuggest).to.equal('function');
//   });
//
//   it(`SP WS(S) NAR(VSS PC)`, function () {
//     let characterList = [
//       {displayName: 'Harry Potter', aliases: ['Harry']},
//       {displayName: 'Albus Dumbledore', aliases: ['Dumbledore']}
//     ];
//     let indexSpeechSelected = 0;
//     customLexicon['dumbledore'] = 'PersonConfirmed';
//     customLexicon['said'] = 'VerbSaidSynonym';
//     let preSnippets = [
//       new PreSnippet(`“What did you say?”`, 'speech', 0),
//       new PreSnippet(` `, 'whitespace', 1),
//       new PreSnippet(`asked Dumbledore.`, 'narration', 2),
//     ];
//     expect(nameSuggest(preSnippets, characterList, indexSpeechSelected, customLexicon))
//           .to.deep.equal(new NameSuggestion({displayName: 'Albus Dumbledore', aliases: ['Dumbledore']}, ['SP WS(S) NAR(VSS PC)']));
//   });
//
// });//end describe('bookStorageFormat'
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
