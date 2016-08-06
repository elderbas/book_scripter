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
  const nonWhiteSpace = [
    _.map(extendedPreSnippetsObj.nonWhiteSpace[0], s => preSnippetClassify(s, nlp)),
    _.map(extendedPreSnippetsObj.nonWhiteSpace[1], s => preSnippetClassify(s, nlp)),
  ];
  const nonSingleSpace = [
    _.map(extendedPreSnippetsObj.nonSingleSpace[0], s => preSnippetClassify(s, nlp)),
    _.map(extendedPreSnippetsObj.nonSingleSpace[1], s => preSnippetClassify(s, nlp)),
  ];

  let leftSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpace[0].reverse());
  let rightSideNWS = grabClassificationsAsJoinedStrings(nonWhiteSpace[1]);
  output.nonWhiteSpaceArrangement = leftSideNWS + '|' + rightSideNWS;

  let leftSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[0].reverse());
  let rightSideAC = grabClassificationsAsJoinedStrings(classifiedSnippets[1]);
  output.arrangementComplete = leftSideAC + '|' + rightSideAC;

  let leftSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[0].reverse());
  let rightSideNSS = grabClassificationsAsJoinedStrings(nonSingleSpace[1]);
  output.nonSingleSpaceArrangement = leftSideNSS + '|' + rightSideNSS;

  return output;
};

module.exports = classifyPreSnippetArrangement;