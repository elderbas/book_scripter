'use strict';
const _ = require('lodash');
const arrangementMatchers = require('./arrangementMatchers');

const checkArrangementForMatches = (preSnippetArrangement, preSnippetExtended, matchers) => {
  let namedSuggestedObj = {suggestedName: null, whichMatcher: null};
  let matched = _.find(matchers, (m) => {
    return preSnippetArrangement.includes(m.arrangementTextMatcher)
  });
  if (!matched) {
    return null;
  }
  let name = matched.getNameOut(preSnippetExtended);
  if (!name) {
    return null;
  }
  namedSuggestedObj.suggestedName = name;
  namedSuggestedObj.whichMatcher = matched.whichMatcher;
  return namedSuggestedObj;
};

// returns a single name if one is found
// returns null if none are found
// classifyPreSnippetArrangement(...) produces -> preSnippetClassifiedArrangementObj
// grabExtendingPreSnippets(...) produces -> preSnippetExtendedObj
const nameSuggest = (preSnippetClassifiedArrangementObj, preSnippetExtendedObj) => {
  let nonSsArrangementNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.nonSingleSpaceArrangement, preSnippetExtendedObj.nonSingleSpace, arrangementMatchers.nonSsMatchers
  );
  let nonWsNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement, preSnippetExtendedObj.nonWhiteSpace, arrangementMatchers.nonWsMatchers
  );
  let withWsArrangementNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.arrangementComplete, preSnippetExtendedObj.allExtended, arrangementMatchers.withWsMatchers
  );
  if (withWsArrangementNameMatch) {
    // console.log('withWsArrangementNameMatch', withWsArrangementNameMatch);
    return withWsArrangementNameMatch
  }
  if (nonSsArrangementNameMatch) {
    // console.log('nonSsArrangementNameMatch');
    return nonSsArrangementNameMatch;
  }
  else if (nonWsNameMatch) {
    // console.log('no whitey');
    return nonWsNameMatch;
  }
  else {
    return null;
  }
};

module.exports = nameSuggest;

























