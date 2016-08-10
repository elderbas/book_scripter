'use strict';
let _ = require('lodash');



/*
 input value(s):
   configObj keys
   - textToSplit: da big text
   - stringToMatch: string to match for where to split at
   - splitAtThisIntervalIndex: at every X index, (plus count to get to a regexPattern), split at that point
   example: {
     textToSplit: '"Charlie was there" "Ok cool let's go"'
     stringToMatch: ' '
     splitAtThisIntervalIndex: 5
   }

  return value:
    string[]
    example
    [
      '"Charlie was there"',
      '"Ok cool let's go"'
    ]
 */
function bookSplitter (configObj) {
  if (_.get(configObj, 'textToSplit') === undefined) { throw new Error('missing textToSplit on bookSplitter'); }
  if (_.get(configObj, 'strPatternToSplitOn') === undefined) { throw new Error('missing strPatternToSplitOn on bookSplitter'); }
  if (_.get(configObj, 'splitAtThisIntervalIndex') === undefined) { throw new Error('missing splitAtThisIntervalIndex on bookSplitter'); }

  let textToSplit = configObj.textToSplit;
  let strPatternToSplitOn = configObj.strPatternToSplitOn;
  let splitAtThisIntervalIndex = configObj.splitAtThisIntervalIndex;
  var lastMatchedIndex = 0;
  // from point of splitAtThisIntervalIndex, start looking forward for regex pattern match exec,
  // previous portion at point of match is a textSplitBlob
  let datTextArray = [];
  while (true) {
    let indexStrMatched = textToSplit.indexOf(strPatternToSplitOn, lastMatchedIndex);
    // this should indicate that we're towards the end of the book
    // if no match from textToSplit is found, put the rest of textToSplit inside
    // note: would be good to know if there was at least one found, to help debug whether faulty pattern match
    // and we don't just shove the whole book in there
    if (indexStrMatched === -1) {
      datTextArray.push(textToSplit);
      break;
    }
    // if we get a match, make sure index of finding it is at least at point of splitAtThisIntervalIndex
    // extract off from 0, the textToSplit, into the datTextArray
    // rip off the beginning part from textToSplit onto itself reset
    else if (indexStrMatched > splitAtThisIntervalIndex) {
      lastMatchedIndex = 0;
      let textToPush = textToSplit.slice(0, indexStrMatched + strPatternToSplitOn.length);
      datTextArray.push(textToPush);
      textToSplit = textToSplit.slice(indexStrMatched + strPatternToSplitOn.length); // this is probably bad performance
    }
    else {
      lastMatchedIndex = indexStrMatched + strPatternToSplitOn.length;
    }

    // if indexMatched isn't at least splitAtThisIntervalIndex, keep looping even if match found
  }
  return datTextArray;
}//end bookSplitter 

module.exports = bookSplitter;
 