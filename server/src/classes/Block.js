'use strict';

class Block {
  constructor (preSnippets, snippets, status, blockId) {
    this.preSnippets = preSnippets;
    this.snippets =  snippets || [];
    this.blockId = blockId;
    this.status = status || 'untouched';
  }
}

module.exports = Block;