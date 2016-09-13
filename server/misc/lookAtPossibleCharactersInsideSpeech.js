// scratch for just investigating what sort of charact
'use strict';
let nlp = require('nlp_compromise');
let newLex = nlp.lexicon();
newLex['ser waymar royce'] = 'TARGETED_GUY';
console.log(nlp.sentence('Ser Waymar Royce asked cooly.', {lexicon: newLex}).terms);









