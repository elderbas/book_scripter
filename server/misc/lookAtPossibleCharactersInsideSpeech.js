// scratch for just investigating what sort of charact
'use strict';
let nlp = require('nlp_compromise');
let newLex = nlp.lexicon();
newLex['pulava'] = 'PORT_WORD';
console.log(nlp.sentence('He pulava a lot', {lexicon: newLex}));

nlp = reload('nlp_compromise');
console.log(nlp.sentence('He pulava a lot'));








