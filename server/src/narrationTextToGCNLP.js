// narrationTextToGCNLP.js

let _ = require('lodash')
const ltt = require('../constants/lexiconTagTypes');
const SP = ltt.SPEECH
const M_NL = ltt.WS_MULTI_NEWLINE
const RIGHT = 1;
const LEFT = 0;

const googleNarMatchers = [
  {
    arrangementTextMatcher: `${M_NL},NAR|${M_NL}`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][0],
    whichMatcher: 'strandedWithNarOnLEFT',
    // a given pattern matched means now there are rules to be checked on the
    // google response based on any entities encountered and their entity classification
    // an entity's salience, and what an entity's token type is
    // these rules have been created based on hand labeling GoT book 1 and sending
    // each nar to Google NLP API and verifying what patterns are necessary to
    // make a match happen based on Google's response
  },
  {
    arrangementTextMatcher: `${M_NL}|NAR,${M_NL}`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[RIGHT][1],
    whichMatcher: 'strandedWithNarOnRIGHT'
  },

  // eventually want to do something with this right nar, to verify the gender of speaker, and check for
  // genered pronoun of 'he/she' to help narrow down a possible 'people' entity on the left if there were
  // a dispute between which it would be referring to
  {
    arrangementTextMatcher: `${M_NL},NAR|NAR`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][0],
    whichMatcher: 'NarsBeDoubleTeaminAndWhoKnowsWhatFurtherRIGHT'
  }
]

const HIGH_SAL = 50
// return a name from googleCloudResponse
// it is not responsibility of this function to verify that name suggested is part of the characterProfile list
const narrationTextToGCNLP = (nonSingleSpacePatternArrangement, nonSingleSpacePreSnippetExtendedObj, googleCloudResponse) => {
  // if there's a match for preSnippetArrangement
  // get the narration text out
  // send that name to google cloud
  // use result

  console.log(nonSingleSpacePatternArrangement);
  console.log(nonSingleSpacePreSnippetExtendedObj);
  console.log(googleCloudResponse);

  // if there's 1 person, it has above 50 sal, and is NSUBJ, return that person's charProfile
  // let people = _.get(googleCloudResponse, 'entities.people')
  // let tokens = _.get(googleCloudResponse, 'tokens')
  // if (people && people.length === 1) {
  //   let person = people[0]
  //   let { salience } = person
  //   if (salience > HIGH_SAL) {
  //     if (tokens && person.name) {
  //       let tokenOfPerson = _.find(tokens, t => _.get(t, 'text.content') === person.name)
  //       let labelType = _.get(tokenOfPerson, 'dependencyEdge.label')
  //       console.log('labelType', labelType);
  //       if (labelType === 'NSUBJ') {
  //         return person.name
  //       }
  //     }
  //   }
  // }
}
module.exports = narrationTextToGCNLP;