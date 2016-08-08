'use strict';

class Block {
  constructor (preSnippets) {
    this.preSnippets = preSnippets;
    this.snippets =  [];
    this.status = 'untouched';
  }
}

module.exports = Block;