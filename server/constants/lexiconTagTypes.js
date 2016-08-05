'use strict';

/* at this point 'lexiconTagType' can be misleading for the whitespace types
 * since a lexicon object isn't used for them, however, it is used with the presnippet text
 * parsing */
const lexiconTagTypes = {
  /* for use with narration types*/

  PERSON_CONFIRMED:      'PERSON_CONFIRMED',
  VERB_SYNONYM_TO_SPOKE: 'VERB_SYNONYM_TO_SPOKE',
  PERSON_PRONOUN:        'PERSON_PRONOUN',

  /* for use with the whitespace types*/
  WS_SINGLE_SPACE:       'WS_SINGLE_SPACE',
  WS_MULTI_SPACE:        'WS_MULTI_SPACE',
  WS_SINGLE_NEWLINE:     'WS_SINGLE_NEWLINE',
  WS_MULTI_NEWLINE:      'WS_MULTI_NEWLINE',
  WS_MIXED_WS:           'WS_MIXED_WS',
  WS_NON_WS:             'WS_NON_WS',

  /**/
  SPEECH: 'SPEECH'
};
module.exports = lexiconTagTypes;