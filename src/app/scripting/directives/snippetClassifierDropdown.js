angular.module('app').directive('snippetTypeDropdown', [
  'CollectionHelper',
  snippetTypeDropdown
]);
/**
 * @ngdoc function
 * @name app.directive:snippetTypeDropdown
 * @description
 * # snippetTypeDropdown
 * Directive of snippetTypeDropdown
 */
function snippetTypeDropdown (CollectionHelper) {
  let templ = `
    <ul class="snippet-type-dropdown">
      <li ng-repeat="snipType in possibleSnippetTypes">{{snipType}}</li>
    </ul>
  `;
  return {
    restrict: 'E',
    scope: {
      blah: "=",
    },
    template: templ,
    link: link,
  };

  /* TODO - UX
  * when it's active, but the user hasn't selected something yet, if mouse out of UL, then
  * change color of it all to ghost, so they see it's there, but maybe they want to look where the
  * text is that they just selected
  * */

  function link (scope, element, attrs) {
    scope.possibleSnippetTypes = CollectionHelper.getPossibleSnippetTypes();

    function blah () {

    }//end blah()
  }//end link()


}//end snippetTypeDropdown()
