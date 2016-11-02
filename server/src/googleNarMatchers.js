// googleNarMatchers.js

let _ = require('lodash')
const ltt = require('../constants/lexiconTagTypes');
const SP = ltt.SPEECH
const M_NL = ltt.WS_MULTI_NEWLINE
const RIGHT = 1;
const LEFT = 0;
const filterObject = (filteringObj, predicate) => {
  let obj = {}
  for (let key in filteringObj) {
    let passed = predicate(filteringObj[key], key)
    if (passed) {
      obj[key] = filteringObj[key]
    }
  }
  return obj
}

/*
* ruleName - string
* inclusiveMinimumSalience - number, 0 - 100
* possibleEntityTypes - null for all OR array of string names to filter (possible - 'person', 'organization', 'other', 'place')
* possibleLabelTypes - null for all OR array of string names to filter (possible - 'NSUBJ', 'POSS', 'NSUBJPASS'),
* maximumNumberOfEntitiesAllowed - after all filtering, how many entities are allowed to be left
* */
// a given pattern matched means now there are rules to be checked on the
// google response based on any entities encountered and their entity classification
// an entity's salience, and what an entity's token type is
// these rules have been created based on hand labeling GoT book 1 and sending
// each nar to Google NLP API and verifying what patterns are necessary to
// make a match happen based on Google's response
const ruleMatcherCreator = (ruleName, inclusiveMinimumSalience, possibleEntityTypes, possibleLabelTypes, maximumNumberOfEntitiesAllowed) => {
  return (annotation) => {
    let entities = _.get(annotation, 'entities')
    if (entities) {
      let allowedEntities = (possibleEntityTypes === null)
        ? entities
        : filterObject(entities, (entityVal, entityType) => possibleEntityTypes.includes(entityType))

      // push all entities, regardless of type, onto a single array, each entity type getting equal preference to this point
      let aggregateEntities = []
      _.forEach(allowedEntities, (entityArr) => {
        _.forEach(entityArr, eA => aggregateEntities.push(eA))
      })

      // filter for entities with a matching text name, and matching label types
      // performance note: re searching over the annotation.tokens array isn't the most efficient way, but these arrays should stay pretty small
      let entitiesFilteredConsideringLabelTypes = (possibleLabelTypes === null)
        ? aggregateEntities
        : aggregateEntities.filter(aE => _.find(annotation.tokens, t => t.text.content === aE.name && possibleLabelTypes.includes(t.dependencyEdge.label)) )

      if (entitiesFilteredConsideringLabelTypes.length <= maximumNumberOfEntitiesAllowed) {
        // always just pick highest salience left at this point
        // Note: this could be a problem if we want 'people' to get more preference than a type such as 'place',
        // but then we probably just wouldn't want that in our 'possibleLabelTypes' at that point
        let predictedEntity = _.maxBy(entitiesFilteredConsideringLabelTypes, 'salience')
        if (_.get(predictedEntity, 'salience') >= inclusiveMinimumSalience) {
          return { predictedEntity, ruleName }
        }
      }
      return null
    }
  }
}


let singleHighSalSubj = ruleMatcherCreator('single high sal subj', 50, ['people'], ['NSUBJ'], 1)
let singleHighSalSubjPoss = ruleMatcherCreator('single high sal poss', 50, ['people'], ['NSUBJ', 'POSS'], 1)
const googleNarMatchers = [
  {
    arrangementTextMatcher: `${M_NL},NAR|${M_NL}`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][0],
    whichMatcher: 'strandedWithNarOnLEFT',
    googleResponseRuleMatchers: [
      singleHighSalSubjPoss
    ]
  },
  {
    arrangementTextMatcher: `${M_NL}|NAR,${M_NL}`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[RIGHT][0],
    whichMatcher: 'strandedWithNarOnRIGHT',
    googleResponseRuleMatchers: [
      singleHighSalSubjPoss
    ]
  },
  // eventually want to do something with this right nar, to verify the gender of speaker, and check for
  // genered pronoun of 'he/she' to help narrow down a possible 'people' entity on the left if there were
  // a dispute between which it would be referring to
  {
    arrangementTextMatcher: `${M_NL},NAR|NAR`,
    getNarrationTextOut: (extendedPreSnippets) => extendedPreSnippets[LEFT][0],
    whichMatcher: 'NarsBeDoubleTeaminAndWhoKnowsWhatFurtherRIGHT',
    googleResponseRuleMatchers: [
      singleHighSalSubjPoss
    ]
  }
]

// future prediction rules
/*
  if no entities found in this nar, use second to last speaker

  ML,nar|
*/

/*
  if multiple people found, use the highest salience

  ML,nar|
*/

/*
  use same rule as NSUBJ as you would for comming across POSS

  ML,nar|
  or
  |NAR
*/







module.exports = googleNarMatchers;
