'use strict';
const ltt = require('../../../constants/lexiconTagTypes');
const RIGHT = 1;
const LEFT = 0;
const NAR_PC_VSS = `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PC = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_CONFIRMED})`;
const NAR_PR_VSS = `NAR(${ltt.PERSON_PRONOUN} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const SP = ltt.SPEECH;
const M_NL = ltt.WS_MULTI_NEWLINE;
const SS = ltt.WS_SINGLE_SPACE;

const narTipToRight = {
  arrangementTextMatcher: `|NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'narTipToRight'
};
const narTipToLeft = {
  arrangementTextMatcher: `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})|`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[LEFT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'narTipToLeft'
};
const nonWsMatchers = [ narTipToRight, narTipToLeft ];

module.exports = nonWsMatchers;