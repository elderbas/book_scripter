'use strict';
/* use for extracting text using the Stream data, we could probably eliminate the
 * streams altogether but making the Stream object at the time seemed easier to parse. This however,
  * will be the text used to try pre-html injection analysis to predict character list and character assignments
  * to the snippets */
class PreSnippet {
  constructor (text, type, id) {
    this.text = text;
    this.type = type;
    this.id = (id === undefined) ? null : id;
    this.classification = null;

    if (type === 'narration') {
      this.predictedCharacterNameNormalized = null;
    }
    if (type === 'speech') {
      this.personConfirmedNormalized = null; // to be used later for arrangement classification after user confirms somebody spoke this
    }
  }
}

module.exports = PreSnippet;