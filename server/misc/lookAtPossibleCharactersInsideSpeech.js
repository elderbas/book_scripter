// scratch for just investigating what sort of charact
'use strict';
const lexiconTagTypes = require('../constants/lexiconTagTypes');
let nlp = require('nlp_compromise');
let newLex = nlp.lexicon();
// let newLex = {};
newLex['will'] = 'PERSON_CONFIRMED';
// newLex['pointed out'] = 'VERB_SYNONYM_TO_SPOKE';
let res = nlp.text('Will went in front of the wagon.', {lexicon: newLex})
console.log(JSON.stringify(res, null, 4));









