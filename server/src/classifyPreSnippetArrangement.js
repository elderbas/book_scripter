'use strict';
const _ = require('lodash');
const preSnippetClassify = require('./preSnippetClassify');


const grabClassificationsAsJoinedStrings = (arrOfPreSnips) => arrOfPreSnips.map(s => s.classification).join(',');
const classifyPreSnippetArrangement = (extendedPreSnippetsObj, nlp) => {
  let output = {};
  const classifiedSnippets = [
    _.map(extendedPreSnippetsObj.allExtended[0], s => preSnippetClassify(s, nlp)),
    _.map(extendedPreSnippetsObj.allExtended[1], s => preSnippetClassify(s, nlp)),
  ];
  const nonWhiteSpaceOnly = [
    _.map(extendedPreSnippetsObj.nonWhiteSpaceOnly[0], s => preSnippetClassify(s, nlp)),
    _.map(extendedPreSnippetsObj.nonWhiteSpaceOnly[1], s => preSnippetClassify(s, nlp)),
  ];
  let leftSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpaceOnly[0]);
  let rightSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpaceOnly[1]);
  output.nonWhiteSpaceArrangement = leftSideNWS + '|' + rightSideNWS;

  let leftSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[0]);
  let rightSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[1]);
  output.arrangementComplete = leftSideAC + '|' + rightSideAC;

  return output;
};

module.exports = classifyPreSnippetArrangement;