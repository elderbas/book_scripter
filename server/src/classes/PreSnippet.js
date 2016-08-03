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
    if (type === 'narration') {
      this.predictedCharacterNameNormalized = null;
    }
    if (type !== 'speech') {
      this.classification = null;
    }
  }
}

module.exports = PreSnippet;