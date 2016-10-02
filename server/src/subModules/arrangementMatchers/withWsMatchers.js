// withWsMatchers.js

'use strict';
const ltt = require('../../../constants/lexiconTagTypes');
const RIGHT = 1;
const LEFT = 0;
const NAR_PC_VSS = `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PC = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_CONFIRMED})`;
const NAR_PR_VSS = `NAR(${ltt.PERSON_PRONOUN} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PR = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_PRONOUN})`;
const SP = ltt.SPEECH
const M_NL = ltt.WS_MULTI_NEWLINE
const WS_SS = ltt.WS_SINGLE_SPACE
const P_PR = ltt.PERSON_PRONOUN
/* remember, '|' represents THE speech preSnippet in question*/

// use 'predictedCharacterNameNormalized' if you're grabbing it from a NAR with PERSON in it
// use 'personConfirmedNormalized' if it's from a speech ''

// left part of - “Some,” Will muttered. “The wind, m’lord.”
// “We should start back,” Gared urged as the woods began to grow dark around them.
let withWsMatchers = [];
withWsMatchers.push({
  arrangementTextMatcher: `|${WS_SS},${NAR_PC_VSS}`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToRight'
});
withWsMatchers.push({
  arrangementTextMatcher: `|${WS_SS},${NAR_VSS_PC}`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToRightbackwards'
});


// right part of “Some,” Will muttered. “The wind, m’lord.”
// Will shrugged. “A couple are sitting up against the rock. Most of them on the ground. Fallen, like.”
withWsMatchers.push({
  arrangementTextMatcher: `${NAR_PC_VSS},${WS_SS}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToLeft'
});

withWsMatchers.push({
  arrangementTextMatcher: `${NAR_VSS_PC},${WS_SS}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToLeftBackwards'
});


withWsMatchers.push({
  arrangementTextMatcher: `${SP},${M_NL},${SP},${M_NL}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][3].personConfirmedNormalized,
  whichMatcher: 'alternatingSpeechABA'
});


// temporary fix until getting the function version going
// only need to do this because doing a .includes check means that in order to
// have the functionality of just checking a NAR() with ANYTHING, it has to have every possible
// variation in there. Ideally regex is possible but this seemed faster for the moment
withWsMatchers.push(...getInferFromJustOverTheNarPermutations())

// this one may be obsolete compared to just above
withWsMatchers.push({
  arrangementTextMatcher: `${SP},${WS_SS},${NAR_PR_VSS},${WS_SS}|`,
  getNameOut: (extendedPreSnippets) => {
    console.log('extendedPreSnippets[LEFT][3].personConfirmedNormalized', extendedPreSnippets[LEFT][3].personConfirmedNormalized);
    return extendedPreSnippets[LEFT][3].personConfirmedNormalized
  },
  whichMatcher: 'inferPronounFromJustToLeft'
});

//
// /*
//  Gared dismounted. “We need a fire. I’ll see to it.”
//
//  NAR(PC PastTense),WS_SS|
//  * */
// withWsMatchers.push({
//   arrangementTextMatcher: `${M_NL},NAR(PERSON_CONFIRMED),${WS_SS}|${M_NL}`,
//   getNameOut: (extendedPreSnippets) => {
//     return extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized
//   },
//   whichMatcher: 'incompleteCharJustToLeft'
// });
//
// /*
// *
// * I think we need more than just 2 term types mentioned
// * */
// withWsMatchers.push({
//   arrangementTextMatcher: `${M_NL},NAR(PERSON_CONFIRMED PastTense),${WS_SS}|${M_NL}`,
//   getNameOut: (extendedPreSnippets) => {
//     return extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized
//   },
//   whichMatcher: 'incompleteCharJustToLeftButWithPastTense'
// });
//
//
// withWsMatchers.push({
//   arrangementTextMatcher: `${M_NL}|${WS_SS},NAR(PERSON_CONFIRMED),${M_NL}`,
//   getNameOut: (extendedPreSnippets) => {
//     return extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized
//   },
//   whichMatcher: 'incompleteCharJustToRight'
// });
//
// withWsMatchers.push({
//   arrangementTextMatcher: `${M_NL}|${WS_SS},NAR(PERSON_CONFIRMED PastTense),${M_NL}`,
//   getNameOut: (extendedPreSnippets) => {
//     return extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized
//   },
//   whichMatcher: 'incompleteCharJustToRightButWithPastTense'
// });
//
// withWsMatchers.push({
//   arrangementTextMatcher: `NAR(PERSON_CONFIRMED PastTense),WS_SINGLE_SPACE|WS_SINGLE_SPACE,NAR(PERSON_PRONOUN VERB_SYNONYM_TO_SPOKE)`,
//   getNameOut: (extendedPreSnippets) => {
//     return extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized
//   },
//   whichMatcher: 'incompleteCharJustToLEFTButWithPastTenseAndPronounEnforcer'
// });









//
// withWsMatchers.forEach((match) => {
//   console.log('XXxxxxxxxxxXXxxxxxxxxxXXxxxxxxxxxXXxxxxxxxxxXXxxxxxxxxx');
//   console.log('match.arrangementTextMatcher', match.arrangementTextMatcher);
//   console.log('match.whichMatcher', match.whichMatcher);
// })

// this is a hack until
// getting a more coherent nar tag type arranger
function getInferFromJustOverTheNarPermutations() {
  let baseNarTagTypes = [
    'PastTense',
    'PERSON_CONFIRMED',
    'PERSON_PRONOUN',
    'VERB_SYNONYM_TO_SPOKE',
  ]
  let spaceConcat = (x, y) => `${x} ${y}`
  let permutations = []
  baseNarTagTypes.forEach((type1) => {
    baseNarTagTypes.forEach((type2) => {
      permutations.push(spaceConcat(type1, type2))
    })
  })
  let variations = baseNarTagTypes.concat(permutations).concat(['']).map((narTagArranVari) => {
    return {
      arrangementTextMatcher: `${SP},${WS_SS},NAR(${narTagArranVari}),${WS_SS}|`,
      getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][3].personConfirmedNormalized,
      whichMatcher: `inferFromJustOverTheNar-${narTagArranVari}`
    }
  })
  return variations
}
/* IDEA FOR WATCHER
 * arrangementTextMatcher: `${SP},${WS_SS},${NAR*},${WS_SS}|`,
 * just get it out of the speech at [LEFT][3]
 * but the nar needs to be anything (I think, at the very ) */




// maybe some of these can have a % of certainty?

// condensed for space
// “We should start back,” Gared urged as the woods began to grow dark around them.
// “The wildlings are dead.” <--
// withWsMatchers.push({
//   arrangementTextMatcher: `${SP},${WS_SS},${NAR_PC_VSS},${M_NL}|${M_NL},${SP}`,
//   getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized,
//   whichMatcher: 'stragglerAfterTheFact'
// });

// this one makes me doubt 'stragglerAfterTheFact'
/*
 “The camp is two miles farther on, over that ridge, hard beside a stream,” Will said. “I got close as I dared. There’s eight of them, men and women both. No children I could see. They put up a lean-to against the rock. The snow’s pretty well covered it now, but I could still make it out. No fire burning, but the firepit was still plain as day. No one moving. I watched a long time. No living man ever lay so still.”
 “Did you see any blood?”
 “Well, no,” Will admitted.
 “Did you see any weapons?”
 “Some swords, a few bows. One man had an axe. Heavy-looking, double-bladed, a cruel piece of iron. It was on the ground beside him, right by his hand.”
 “Did you make note of the position of the bodies?”
 Will shrugged. “A couple are sitting up against the rock. Most of them on the ground. Fallen, like.”
 “Or sleeping,” Royce suggested.
* */


/*OBSERVATION
 Will pulled his garron over beneath an ancient gnarled ironwood and dismounted.

 “Why are you stopping?” Ser Waymar asked.

 “Best go the rest of the way on foot, m’lord. It’s just over that ridge.”
NAR(PERSON_CONFIRMED PastTense|VSS),ML,SP,WS_SS,NAR(*),ML|
* */

/*
 “Gared, stay here. Guard the horses.”

 Gared dismounted. “We need a fire. I’ll see to it.”

 “How big a fool are you, old man? If there are enemies in this wood, a fire is the last thing we want.”
 SP,ML,NAR(*),SP,ML|
 [LEFT][4]
* */


/*
THIS IS INTERESTING BECAUSE IF YOU DID A CHECK TO THE RIGHT FOR THE NAME, YOU'D BE WRONG
IN GUESSING BY USING NAR(PERSON,PASTTENSE

 1)Down below, the lordling called out suddenly, “Who goes there?” Will heard uncertainty in the challenge. He stopped climbing; he listened; he watched.
 2)Will heard the breath go out of Ser Waymar Royce in a long hiss. “Come no farther,” the lordling warned.
 3)Bran gave the pup a quick nervous stroke, then turned as Jon said, “Here you go.” His half brother put a second pup into his arms. “There are five of them.” Bran sat down in the snow and hugged the wolf pup to his face. Its fur was soft and warm against his cheek.
* */


/*
"I have to leave" , <- Albert
"whoa" bob said "go get it" , <- Bob twice
"is that what you think?" <- Albert
ML|ML
pick the second to last person speaking from point of |
loneSpeech,useSecondToLast
*/

/*
ML,NAR()|
if it doesnt match anything, then pass the NAR to GCNLP,
*/

/*
ML|NAR()
if it doesnt match anything, then pass the NAR to GCNLP,
*/





module.exports = withWsMatchers;
