'use strict';

class Block {
  constructor (preSnippets, snippets, status) {
    this.preSnippets = preSnippets;
    this.snippets =  snippets || [];
    this.status = status || 'untouched';
  }
}

module.exports = Block;