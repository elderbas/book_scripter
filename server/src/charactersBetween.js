"use strict";
function charactersBetween (strToSplitUp, firstCharMatcher, secondCharMatch) {
  // just go single character by single character
  let indexFirstCharMatch = null, indexSecondCharMatch = null, strGroupsMatched = [];
  let increment = 0;
  for (let i = 0, len = strToSplitUp.length; i < len; i++) {
    // we're looking for our first character matching index
    if (indexFirstCharMatch === null) {
      if (strToSplitUp.charAt(i) === firstCharMatcher) {
        // set the 'index first char match
        indexFirstCharMatch = i;
        // skip to next iteration so we don't match let index secondCharMatch get set as well in case
        // we have the same break point character
        continue;
      }
    }
    if (indexSecondCharMatch === null) {
      if (strToSplitUp.charAt(i) === secondCharMatch) {
        // set the 'index first char match
        indexSecondCharMatch = i;
        // take the text from index of first char match, and slice it all the way to the index of second char match
        strGroupsMatched.push(strToSplitUp.slice(indexFirstCharMatch+1, indexSecondCharMatch));
        // after that, reset index for first and second chars to null so we can look for another match group
        indexFirstCharMatch = indexSecondCharMatch = null;
      }
    }
  }// end for loop
  return strGroupsMatched;
}// end possibleCharactersBetween


module.exports = charactersBetween;