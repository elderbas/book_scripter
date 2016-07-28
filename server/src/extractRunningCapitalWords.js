'use strict';
let _ = require('lodash');

/*
* purpose - to get names out of sentences
*         - if a name is used as "Bob's", then it will be used as "Bob"
*
* */
function extractRunningCapitalWords(sentence) {
  let runningCapWords = [];
  if (_.isUndefined(sentence) || sentence.length && sentence.trim() === 0) { return runningCapWords; }
  // replace double white spaces with one
  let wordList = sentence.split(' ');
  let startIndexOfRunningWord = null, endIndexOfRunningWord = null;
  _.forEach(wordList, (word, i, arr) => {
    // word in question is capitalized
    let currWordIsCap = /[A-Z]/.test(word.charAt(0));
    // as long as we keep getting cap words in a row, keep setting the endIndex to the lastest
    if (currWordIsCap) {
      if (_.isNull(startIndexOfRunningWord)){
        startIndexOfRunningWord = endIndexOfRunningWord = i;
      }
      else {
        endIndexOfRunningWord = i;
      }
      // if the current range has any clause-ending punctuation, then name is done being formed
      if (/[,\.:;]/.test(arr[endIndexOfRunningWord])){
        runningCapWords.push(makeDirtyFullNameClean(arr.slice(startIndexOfRunningWord, endIndexOfRunningWord+1).join(' ')));
        startIndexOfRunningWord = endIndexOfRunningWord = null;
      }
    }
    else {
      if (!_.isNull(startIndexOfRunningWord)) {
        let wordToAddOn = arr.slice(startIndexOfRunningWord, endIndexOfRunningWord+1);
        runningCapWords.push(makeDirtyFullNameClean(wordToAddOn.join(' ')));
        startIndexOfRunningWord = endIndexOfRunningWord = null;
      }
    }
    // if we don't have a cap word, AND startIndex is NOT null, push that index range onto runningCapWords
  });

  if (!_.isNull(startIndexOfRunningWord) && !_.isNull(endIndexOfRunningWord)){
    let currentWordInRange = wordList.slice(startIndexOfRunningWord, endIndexOfRunningWord+1);
    runningCapWords.push(makeDirtyFullNameClean(currentWordInRange.join(' ')));
  }
  return filterCommonPronouns(runningCapWords);

  function makeDirtyFullNameClean(str) {
    if (/’s\b/.test(str)) {
      console.log('yayy');
    }
    return str;
    return str.replace(/[^A-z\s-]/g, '').trim();
  }
  function filterCommonPronouns (arr) {
    let pronouns = ['i', 'he', 'she', 'it', 'we', 'they'];
    return arr.filter((word) => {
      return !pronouns.includes(word.toLowerCase());
    });
  }
}

module.exports = extractRunningCapitalWords;