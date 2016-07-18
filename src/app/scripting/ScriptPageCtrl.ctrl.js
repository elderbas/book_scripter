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

  $scope.scriptList = [
    {type: 'chapter_break', text: 'Chapter 1 - The Boy Who Lived'},
    {nameToText: 'Professor McGonagall', text: '“You’d be stiff if you’d been sitting on a brick wall all day,”', type: 'speech'},
    {nameToText: 'Narrator', text: 'said Professor McGonagall', type: 'narration'},
    {nameToText: 'Professor Dumbledore', text: '“All day? When you could have been celebrating? I must have passed a dozen feasts and parties on my way here.”'}
  ];

  // use cookie to get last block
  $scope.initialize();
}
