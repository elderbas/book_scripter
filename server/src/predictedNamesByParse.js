'use strict';
const jsonfile = require('jsonfile');
const _ = require('lodash');
const extractRunningCapitalWords = require('./extractRunningCapitalWords');
require('../setGlobalVars.js');

/*
* get all predicted names
*
* */

/* description:
  looks over the preSnippet object text and has some logic looking for character names and returns a uniq list of names
  note: if a name is referenced in two different ways, for example 'Jon' and 'Ser Jon', they will be considered different,
        and the user will have to mark one of them as a duplicate of the other later in the UI
   input - array of PreSnippet objects
*  returns obj with
*   predicted character names
* */
// TODO -
/*
* if there are multiple words in a name, check each word in it, and if 50% or more are non name matches (remove final end if it exists on the word), then filter it out
* */
const mostCommonWordsHash = jsonfile.readFileSync(`${_serverDir_}/db_helper/most_common_10000_words.json`);
const mostCommonNamesHash = jsonfile.readFileSync(`${_serverDir_}/db_helper/most_common_names_5000.json`);
function predictedNamesByParse (perSnippetArr) {
  let preSnipForAnal = [];
  _.forEach(perSnippetArr, (preSnip, i) => {
    if (preSnip.type !== 'whitespace') {
      preSnip.id = i;
      preSnipForAnal.push(preSnip);
    }
  });
  let predictedCharacterNames = [];
  _.forEach(preSnipForAnal, (preSnip) => {
    if (preSnip.type === 'narration') {
      predictedCharacterNames.push({
        name: _.flatten(extractRunningCapitalWords(preSnip.text))[0],
        matchingPSId: preSnip.id
      });
    }
  });
  let flatPrefilteredNameList = _(predictedCharacterNames).flatten().uniq().value();
  let hopefullyNamesNotWords = _.filter(flatPrefilteredNameList, (potentialName) => {
    console.log('potentialName', potentialName);
    return _.isUndefined(mostCommonWordsHash[potentialName.name.toLowerCase()]);
  });
  console.log(hopefullyNamesNotWords);
  return {
    predictedCharacterNames: hopefullyNamesNotWords
  };
}

module.exports = predictedNamesByParse;