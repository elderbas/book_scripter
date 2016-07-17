angular.module('app').directive('scriptList', [
  'CollectionHelper',
  scriptList
]);

/**
 * @ngdoc function
 * @name app.directive:scriptList
 * @description
 * # scriptList
 * Directive of scriptList
 */
function scriptList (CollectionHelper) {

  return {
    restrict: 'E',
    scope: {
      listItems: "="
    },
    templateUrl: 'app/scripting/scriptList.html',
    link
  };

  /**
   * @param snippetType - string, possible vals - speech, thought, narration (more advanced to come later)
   * @param snippetText - string, text which was uttered, or narrated, or thought, or name of a chapter
   * @param characterName (optional) - string, possible vals - speech, thought, narration, chapter heading (more advanced to come later)
   */
  function createSnippet (snippetType, snippetText, characterName) {
    let possibleSnippetTypes = CollectionHelper.getPossibleSnippetTypes();
    if (!_.some(possibleSnippetTypes, v => v === snippetType)) {
      throw Error('error inside createSnippet');
    }
    let snippet = {snippetType, snippetText};
    if (snippetType === 'speech') {
      snippet.characterName = characterName;
    }
    return snippet;
  }

  function link (scope) {

  }
}// end scriptList()

