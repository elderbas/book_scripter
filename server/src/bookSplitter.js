'use strict';
let _ = require('lodash');
module.exports = bookSplitter;


/*

 configObj keys
 - textToSplit: da big text
 - stringToMatch: string to match for where to split at
 - indexIntervalCount: at every X index, (plus count to get to a regexPattern), split at that point

 */
function bookSplitter (configObj) {
  if (_.get(configObj, 'textToSplit') === undefined) { throw new Error('missing textToSplit on bookSplitter'); }
  if (_.get(configObj, 'strPattern') === undefined) { throw new Error('missing strPattern on bookSplitter'); }
  if (_.get(configObj, 'indexIntervalCount') === undefined) { throw new Error('missing indexIntervalCount on bookSplitter'); }
  let textToSplit = configObj.textToSplit;
  let strPattern = configObj.strPattern;
  let indexIntervalCount = configObj.indexIntervalCount;

  // from point of indexIntervalCount, start looking forward for regex pattern match exec,
  // previous portion at point of match is a textSplitBlob
  let datTextArray = [];
  while (true) {
    let indexStrMatched = textToSplit.indexOf(strPattern);
    // if no match from textToSplit is found, put the rest of textToSplit inside
    // note: would be good to know if there was at least one found, to help debug whether faulty pattern match
    // and we don't just shove the whole book in there
    if (indexStrMatched === -1) {
      datTextArray.push(textToSplit);
      break;
    }
    // if we get a match, make sure index of finding it is at least at point of indexIntervalCount
    // extract off from 0, the textToSplit, into the datTextArray
    // rip off the beginning part from textToSplit onto itself reset
    else if (indexStrMatched > indexIntervalCount) {
      datTextArray.push(textToSplit.slice(0, indexStrMatched + strPattern.length));
      textToSplit = textToSplit.slice(indexStrMatched + strPattern.length); // this is probably bad performance
    }

    // if indexMatched isn't at least indexIntervalCount, keep looping even if match found
  }
  return datTextArray;
}//end bookSplitter 

 