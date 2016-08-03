'use strict';
const _ = require('lodash');
/*
* use what comes out of these to help analyze the pattern arrange of PreSnippet types
* */
const DEFAULT_DISTANCE_TO_GRAB = 3;
const grabExtendingPreSnippets = (preSnippetList, indexSelected, quantityToGrabOnSides, filterOutWhitespaces) => {
  quantityToGrabOnSides = _.isUndefined(quantityToGrabOnSides) ? DEFAULT_DISTANCE_TO_GRAB : quantityToGrabOnSides;
  let leftPreSnips = preSnippetList.slice(
    (indexSelected - quantityToGrabOnSides) >= 0 ? (indexSelected - quantityToGrabOnSides) : 0,
    indexSelected
  );
  let rightPreSnips = preSnippetList.slice(indexSelected+1, indexSelected+1+quantityToGrabOnSides);

  // reverse at the end here because it's easier to deal with the items in terms of how "far" away they are from
  // the selected speech at time to analyze arrangements
  let extendedPreSnippets = [leftPreSnips.reverse(), rightPreSnips];
  if (filterOutWhitespaces === true) {
    return extendedPreSnippets.map(
      v => v.filter(s => s.type !== 'whitespace')
    );
  }
  return extendedPreSnippets;
};


module.exports = grabExtendingPreSnippets;