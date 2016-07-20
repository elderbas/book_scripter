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
          <li ng-repeat="item in snippetList" class="fx-fade-down fx-dur-10000 fx-ease-back fx-stagger-24">
              <span ng-if="showCharacterName(item.snippetType)" class="name-to-text">{{item.characterName}}:</span>
              <span ng-if="item.snippetType === 'narration'" class="name-to-text">Narrator:</span>
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


  function link (scope) {
    scope.showCharacterName = function (snippetType) {
      return ['thought', 'speech'].includes(snippetType);
    };
  }
}// end scriptList()

