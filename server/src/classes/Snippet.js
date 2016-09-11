'use strict';

class Snippet {
  constructor (characterDisplayName, matchingPreSnippetId, snippetType) {
    this.characterDisplayName = characterDisplayName;
    this.matchingPreSnippetId = matchingPreSnippetId;
    this.snippetType = snippetType
  }
}


module.exports = Snippet;