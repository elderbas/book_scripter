'use strict';
const _ = require('lodash');
/*
* use what comes out of these to help analyze the pattern arrange of PreSnippet types
* */
const DEFAULT_DISTANCE_TO_GRAB = 3; // i think i'll be doing 6 usually though so using the 'white space filtered out' version is more rich
const grabExtendingPreSnippets = (preSnippetList, indexSelected, quantityToGrabOnSides) => {
  quantityToGrabOnSides = _.isUndefined(quantityToGrabOnSides) ? DEFAULT_DISTANCE_TO_GRAB : quantityToGrabOnSides;
  let leftPreSnips = preSnippetList.slice(
    (indexSelected - quantityToGrabOnSides) >= 0 ? (indexSelected - quantityToGrabOnSides) : 0,
    indexSelected
  );
  let rightPreSnips = preSnippetList.slice(indexSelected+1, indexSelected+1+quantityToGrabOnSides);

  // reverse at the end here because it's easier to deal with the items in terms of how "far" away they are from
  // the selected speech at time to analyze arrangements
  let allExtended = [leftPreSnips.reverse(), rightPreSnips];

  const nonWhiteSpace = [
    _.reject(allExtended[0], s => s.type === 'whitespace'),
    _.reject(allExtended[1], s => s.type === 'whitespace'),
  ];

  const nonSingleSpace = [
    _.filter(allExtended[0], s => (s.type === 'whitespace' && s.text !== ' ') || s.type !== 'whitespace'),
    _.filter(allExtended[1], s => (s.type === 'whitespace' && s.text !== ' ') || s.type !== 'whitespace')
  ];

  return { allExtended, nonWhiteSpace, nonSingleSpace };
};


module.exports = grabExtendingPreSnippets;