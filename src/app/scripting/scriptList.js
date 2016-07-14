angular.module('app').directive('scriptList', [scriptList]);

/**
 * @ngdoc function
 * @name app.directive:scriptList
 * @description
 * # scriptList
 * Directive of scriptList
 */
function scriptList() {

  return {
    restrict: 'E',
    scope: {
      listItems: "="
    },
    templateUrl: 'app/scripting/scriptList.html',
    link
  };

  function link () {}
}// end scriptList()
