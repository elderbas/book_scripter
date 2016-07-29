'use strict';
const _ = require('lodash');
/*
* use what comes out of these to help analyze the pattern arrange of PreSnippet types
* */
const grabExtendingPreSnippets = (preSnippetList, indexSelected, quantityToGrabOnSides) => {
  quantityToGrabOnSides = _.isUndefined(quantityToGrabOnSides) ? 3 : quantityToGrabOnSides;
  let leftPreSnips = preSnippetList.slice(
    (indexSelected - quantityToGrabOnSides) >= 0 ? (indexSelected - quantityToGrabOnSides) : 0,
    indexSelected
  );
  let rightPreSnips = preSnippetList.slice(indexSelected+1, indexSelected+1+quantityToGrabOnSides);

  return [leftPreSnips, rightPreSnips];
};


module.exports = grabExtendingPreSnippets;