const lexiconTagType = require('../constants/lexiconTagTypes');
const pronounsAlwaysAdd = [
  'he', 'she'
];
/*
* builds a custom lexicon based on a character list,
* verb list (said, spoke),
* and some defaults
* */
const buildCustomLexicon = (characterList, verbsLikeSpoke, optionalIncludePronouns) => {
  let lexiconAugmentation = {};
  characterList = characterList || [];
  verbsLikeSpoke = verbsLikeSpoke || [];
  characterList.forEach(currChar => {
    lexiconAugmentation[currChar.displayName.toLowerCase()] = lexiconTagType.PERSON_CONFIRMED;
    if (currChar.aliases && currChar.aliases.length > 0) {
      currChar.aliases.forEach(n => lexiconAugmentation[n.toLowerCase()] = lexiconTagType.PERSON_CONFIRMED);
    }
  });
  verbsLikeSpoke.forEach(vls => lexiconAugmentation[vls.toLowerCase()] = lexiconTagType.VERB_SYNONYM_TO_SPOKE);
  verbsLikeSpoke.forEach(vls => lexiconAugmentation[`had ${vls.toLowerCase()}`] = lexiconTagType.VERB_SYNONYM_TO_SPOKE); // for each parsing instances like 'she had yelled'
  if (optionalIncludePronouns === false) {
    return lexiconAugmentation;
  }
  pronounsAlwaysAdd.forEach(p => lexiconAugmentation[p.toLowerCase()] = lexiconTagType.PERSON_PRONOUN);
  return lexiconAugmentation;
};

module.exports = buildCustomLexicon;