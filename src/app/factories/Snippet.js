'use strict';
angular.module('app').factory('Snippet', ['CollectionHelper', Snippet]);

/**
 * @ngdoc factory
 * @name app.factory:Snippet
 * @description
 * # Snippet
 * Factory of Snippet
 */
function Snippet() {
  let SnippetObj = function constr (snippetType, text, characterName) {
    this.snippetType = snippetType;
    this.text = text;
    if (snippetType === 'speech' || snippetType === 'thought') {
      this.characterName = characterName;
    }
  };
  return SnippetObj;
}//end Snippet()
