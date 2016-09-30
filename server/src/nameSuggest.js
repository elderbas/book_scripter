'use strict';
const _ = require('lodash');
const arrangementMatchers = require('./arrangementMatchers');
const fs = require('fs')

const checkArrangementForMatches = (preSnippetArrangement, preSnippetExtended, matchers) => {
  let isDevAndLogging = process.env.NODE_ENV === 'development' && _.get(global, 'log.checkArrangementForMatches')
  let logData  = []

  let namedSuggestedObj = {suggestedName: null, whichMatcher: null};
  let matched = _.find(matchers, (m, i) => {
    if (isDevAndLogging) {
      let logDataItem = {}
      logDataItem.preSnippetArrangement = preSnippetArrangement
      logDataItem['m.arrangementTextMatcher'] = m.arrangementTextMatcher
      logDataItem['preSnipIncludesArrangementTextMatcher'] = preSnippetArrangement.includes(m.arrangementTextMatcher)
      logDataItem['whichMatcher'] = m.whichMatcher
      logData.push(logDataItem)
    }
    return preSnippetArrangement.includes(m.arrangementTextMatcher)
  });

  if (isDevAndLogging) {
    let data = {
      logData: logData.filter(ld => ld['preSnipIncludesArrangementTextMatcher'] === true),
      name: !matched ? 'not matched': matched.getNameOut(preSnippetExtended)
    }
    let pre = '!x!X!X!X!X!X1x1x!X!X!X1x1xX!X!X!x!XX!!X!X!X1x1xX!!X!X1x!X!x!X!X!X'
    fs.writeFileSync(`${_serverDir_}/log/checkArrangementForMatches.log`, pre + '\n' + JSON.stringify(data, null, 4) + '\n\n')
  }
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
  // let nonSsArrangementNameMatch = checkArrangementForMatches(
  //   preSnippetClassifiedArrangementObj.nonSingleSpaceArrangement, preSnippetExtendedObj.nonSingleSpace, arrangementMatchers.nonSsMatchers
  // );
  // let nonWsNameMatch = checkArrangementForMatches(
  //   preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement, preSnippetExtendedObj.nonWhiteSpace, arrangementMatchers.nonWsMatchers
  // );
  let withWsArrangementNameMatch = checkArrangementForMatches(
    preSnippetClassifiedArrangementObj.arrangementComplete, preSnippetExtendedObj.allExtended, arrangementMatchers.withWsMatchers
  );
  if (withWsArrangementNameMatch) {
    // console.log('withWsArrangementNameMatch', withWsArrangementNameMatch);
    return withWsArrangementNameMatch
  }
  // if (nonSsArrangementNameMatch) {
  //   // console.log('nonSsArrangementNameMatch');
  //   return nonSsArrangementNameMatch;
  // }
  // else if (nonWsNameMatch) {
  //   // console.log('no whitey');
  //   return nonWsNameMatch;
  // }
  else {
    return null;
  }
};

module.exports = nameSuggest;
