angular.module('app').controller('ScriptPageCtrl', [
  '$scope',
  'BookHelper',
  'AllWebServices',
  ScriptPageCtrl
]);

function ScriptPageCtrl ($scope, BookHelper, AllWebServices) {
  console.log('BookHelper name! INSIDE NEW PAGE', BookHelper.bookNameWorkingOn);
  $scope.bookNameCurrentlyBeingWorkedOn = BookHelper.bookNameWorkingOn;
  $scope.textBlobWorkZone = {};

  $scope.scriptList = [
    {type: 'chapter_break', text: 'Chapter 1 - The Boy Who Lived'},
    {nameToText: 'Professor McGonagall', text: '“You’d be stiff if you’d been sitting on a brick wall all day,”', type: 'speech'},
    {nameToText: 'Narrator', text: 'said Professor McGonagall', type: 'narration'},
    {nameToText: 'Professor Dumbledore', text: '“All day? When you could have been celebrating? I must have passed a dozen feasts and parties on my way here.”'}
  ];
  AllWebServices.getBlockAndBlobById(0).then(resp => {
    console.log('resp!!!!', resp);

    $scope.textBlobWorkZone.textBlobById = resp.data.textBlobById;
  });

  // Get text for first blob of book to work on
  //

}
