/*
* the nlp library takes an object argument to nlp.lexicon()
* which will add tags it can detect. This will help to identify
* in the sentence when a specific character appears
*
* */

const lexiconTagType = require('../constants/lexiconTagTypes');

const pronounsAlwaysAdd = [
  'he', 'she'
];
const buildCustomLexicon = (characterList) => {
  let lexiconAugmentation = {};
  characterList = characterList || [];
  characterList.forEach(currChar => {
    lexiconAugmentation[currChar.displayName] = lexiconTagType.PERSON_CONFIRMED;
    if (currChar.aliases && currChar.aliases.length > 0) {
      currChar.aliases.forEach(n => lexiconAugmentation[n] = lexiconTagType.PERSON_CONFIRMED);
    }
  });
  pronounsAlwaysAdd.forEach(p => lexiconAugmentation[p] = lexiconTagType.PERSON_PRONOUN);
  return lexiconAugmentation;
};

module.exports = buildCustomLexicon;