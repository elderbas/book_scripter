// scratch for just investigating what sort of charact
'use strict';
const lexiconTagTypes = require('../constants/lexiconTagTypes');
let nlp = require('nlp_compromise');
let newLex = nlp.lexicon();
newLex['jon snow'] = 'PERSON_CONFIRMED';
newLex['jon'] = 'PERSON_CONFIRMED';
let res = nlp.text('Jon replied.', {lexicon: newLex})
console.log(JSON.stringify(res, null, 4));









