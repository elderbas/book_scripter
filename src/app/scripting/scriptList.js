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
      blah: "="
    },
    templateUrl: 'app/scripting/scriptList.html',
    link
  };

  function link (scope) {
    scope.items = ['a', 'b', 'c'];
  }// end link()
}// end scriptList()
