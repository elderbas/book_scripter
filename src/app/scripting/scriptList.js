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
  let template = `
    <section class="script-list-container">
      <ul class="script-list">
          <li ng-repeat="item in snippetList">
              <span ng-if="showCharacterName(item.snippetType)" class="name-to-text">{{item.characterName}}:</span>
              <span class="script-list-text">{{item.text}}</span>
          </li>
      </ul>
    </section>
  `;
  return {
    restrict: 'E',
    template,
    link
  };

  /**
   * @param snippetType - string, possible vals - speech, thought, narration (more advanced to come later)
   * @param snippetText - string, text which was uttered, or narrated, or thought, or name of a chapter
   * @param characterName (optional) - string, possible vals - speech, thought, narration, chapter heading (more advanced to come later)
   */
  //function createSnippet (snippetType, snippetText, characterName) {
  //  let possibleSnippetTypes = CollectionHelper.getPossibleSnippetTypes();
  //  if (!_.some(possibleSnippetTypes, v => v === snippetType)) {
  //    throw Error('error inside createSnippet');
  //  }
  //  let snippet = {snippetType, snippetText};
  //  if (snippetType === 'speech') {
  //    snippet.characterName = characterName;
  //  }
  //  return snippet;
  //}

  function link (scope) {
    scope.showCharacterName = function (snippetType) {
      return snippetType === 'thought' || snippetType === 'speech';
    };
  }
}// end scriptList()

