'use strict';
const _ = require('lodash');
const preSnippetClassify = require('./preSnippetClassify');
const fs = require('fs')


const grabClassificationsAsJoinedStrings = (arrOfPreSnips) => {
  let newArrOfPreSnips = []
  arrOfPreSnips.forEach(s => {
    if (s) {
      newArrOfPreSnips.push(s.classification)
    }
  })
  // arrOfPreSnips.map(s => s.classification).join(',')
  return newArrOfPreSnips.join(',')
}
const classifyPreSnippetArrangement = (extendedPreSnippetsObj, customLexicon, ignoreNarMetaData) => {
  let output = {};
  const classifiedSnippets = [
    _.map(extendedPreSnippetsObj.allExtended[0], s => preSnippetClassify(s, customLexicon, ignoreNarMetaData)),
    _.map(extendedPreSnippetsObj.allExtended[1], s => preSnippetClassify(s, customLexicon, ignoreNarMetaData)),
  ];

  const nonSingleSpace = [
    _.map(extendedPreSnippetsObj.nonSingleSpace[0], s => preSnippetClassify(s, customLexicon, ignoreNarMetaData)),
    _.map(extendedPreSnippetsObj.nonSingleSpace[1], s => preSnippetClassify(s, customLexicon, ignoreNarMetaData)),
  ];

  let leftSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[0].reverse());
  let rightSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[1]);
  output.arrangementComplete = leftSideAC + '|' + rightSideAC;

  let leftSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[0].reverse());
  let rightSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[1]);
  output.nonSingleSpaceArrangement = leftSideNSS + '|' + rightSideNSS;

  if (process.env.NODE_ENV === 'development' && _.get(global, 'log.classifyPreSnippetArrangement')) {
    let logObj = {
      arrangementComplete: output.arrangementComplete,
      nonSingleSpaceArrangement: output.nonSingleSpaceArrangement,
    }
    fs.writeFileSync(`${_serverDir_}/log/classifyPreSnippetArrangement.txt`, '!!!!!!\n\n' + JSON.stringify(logObj, null, 4))
  }
  return output;
};

module.exports = classifyPreSnippetArrangement;