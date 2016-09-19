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

// left part of - “Some,” Will muttered. “The wind, m’lord.”
// “We should start back,” Gared urged as the woods began to grow dark around them.
let withWsMatchers = [];
withWsMatchers.push({
  arrangementTextMatcher: `|${WS_SS},${NAR_PC_VSS}`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToRight'
});

// right part of “Some,” Will muttered. “The wind, m’lord.”
// Will shrugged. “A couple are sitting up against the rock. Most of them on the ground. Fallen, like.”
withWsMatchers.push({
  arrangementTextMatcher: `${NAR_PC_VSS},${WS_SS}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][1].predictedCharacterNameNormalized,
  whichMatcher: 'indicatorJustToLeft'
});


withWsMatchers.push({
  arrangementTextMatcher: `${SP},${M_NL},${SP},${M_NL}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][3].personConfirmedNormalized,
  whichMatcher: 'alternatingSpeechABA'
});

// Gared did not rise to the bait. He was an old man, past fifty, and he had seen the lordlings come and go. “Dead is dead,” he said. “We have no business with the dead.” <- last speech here
withWsMatchers.push({
  arrangementTextMatcher: `${SP},${WS_SS},${NAR_PR_VSS},${WS_SS}|`,
  getNameOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][3].personConfirmedNormalized,
  whichMatcher: 'inferPronounFromJustToLeft'
});



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














module.exports = withWsMatchers;