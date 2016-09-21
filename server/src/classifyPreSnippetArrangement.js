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
const classifyPreSnippetArrangement = (extendedPreSnippetsObj, customLexicon) => {
  let output = {};
  const classifiedSnippets = [
    _.map(extendedPreSnippetsObj.allExtended[0], s => preSnippetClassify(s, customLexicon)),
    _.map(extendedPreSnippetsObj.allExtended[1], s => preSnippetClassify(s, customLexicon)),
  ];
  // const nonWhiteSpace = [
  //   _.map(extendedPreSnippetsObj.nonWhiteSpace[0], s => preSnippetClassify(s, customLexicon)),
  //   _.map(extendedPreSnippetsObj.nonWhiteSpace[1], s => preSnippetClassify(s, customLexicon)),
  // ];
  // const nonSingleSpace = [
  //   _.map(extendedPreSnippetsObj.nonSingleSpace[0], s => preSnippetClassify(s, customLexicon)),
  //   _.map(extendedPreSnippetsObj.nonSingleSpace[1], s => preSnippetClassify(s, customLexicon)),
  // ];

  // let leftSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpace[0].reverse());
  // let rightSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpace[1]);
  // output.nonWhiteSpaceArrangement = leftSideNWS + '|' + rightSideNWS;


  let leftSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[0].reverse());
  let rightSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[1]);
  output.arrangementComplete = leftSideAC + '|' + rightSideAC;
  if (process.env.NODE_ENV === 'development' && _.get(global, 'log.classifyPreSnippetArrangement')) {
    let logObj = {
      arrangementComplete: output.arrangementComplete,
    }
    fs.writeFileSync(`${_serverDir_}/log/classifyPreSnippetArrangement.txt`, '!!!!!!\n\n' + JSON.stringify(logObj, null, 4))
  }
  // let leftSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[0].reverse());
  // let rightSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[1]);
  // output.nonSingleSpaceArrangement = leftSideNSS + '|' + rightSideNSS;

  return output;
};

module.exports = classifyPreSnippetArrangement;