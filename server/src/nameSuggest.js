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
const nameSuggest = (preSnippetClassifiedArrangementObj, preSnippetExtendedObj) => {
  let nonSsArrangementNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.nonSingleSpaceArrangement, preSnippetExtendedObj.nonSingleSpace, arrangementMatchers.nonSsMatchers
  );
  let nonWsNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement, preSnippetExtendedObj.nonWhiteSpace, arrangementMatchers.nonWsMatchers
  );

  if (nonSsArrangementNameMatch) {
    console.log('nonSsArrangementNameMatch');
    return nonSsArrangementNameMatch;
  }
  else if (nonWsNameMatch) {
    console.log('no whitey');
    return nonWsNameMatch;
  }
  else {
    return null;
  }
};

module.exports = nameSuggest;

























