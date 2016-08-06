'use strict';
const ltt = require('../../../constants/lexiconTagTypes');
const RIGHT = 1;
const LEFT = 0;
const NAR_PC_VSS = `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PC = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_CONFIRMED})`;
const NAR_PR_VSS = `NAR(${ltt.PERSON_PRONOUN} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const SP = ltt.SPEECH;
const M_NL = ltt.WS_MULTI_NEWLINE;

/* remember '|' represents a speech type */

let nonSsMatchers = [];
nonSsMatchers.push({
  arrangementTextMatcher: `${M_NL}|${NAR_PC_VSS}`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'speechNarOneLine'
});
nonSsMatchers.push({
  arrangementTextMatcher: `${ltt.WS_MULTI_NEWLINE}|${NAR_PC_VSS}`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'speechAloneVariant'
});

nonSsMatchers.push({
  arrangementTextMatcher: `${SP},${NAR_PR_VSS}|`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[LEFT][1].personConfirmedNormalized;
  },
  whichMatcher: 'pronounWrappedEndGrabsFromJustPreviousConfirmed'
});


module.exports = nonSsMatchers;