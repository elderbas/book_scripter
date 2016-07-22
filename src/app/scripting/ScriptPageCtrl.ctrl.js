angular.module('app').controller('ScriptPageCtrl', [
  '$scope',
  'BookHelper',
  'AllWebServices',
  ScriptPageCtrl
]);

function ScriptPageCtrl ($scope, BookHelper, AllWebServices) {
  $scope.initialize = function () {
    $scope.bookNameCurrentlyBeingWorkedOn = BookHelper.getBookNameWorkingOn();

    // TODO rename this variable and maybe the directive
    $scope.textBlobWorkZone = {};

    // null will get the default stuff per the backend input description for the endpoint
    AllWebServices.dataForInitializeScriptPage().then((resp) => {
      console.log('resp', resp);
      $scope.textBlobWorkZone.textBlobById = _.get(resp, 'data.textBlobById');
      $scope.snippetList = _.get(resp, 'data.snippetBlockById.snippets');
      $scope.characterNames = _.get(resp, 'data.characterNames');
    });
  };

  // use cookie to get last block
  $scope.initialize();
}
