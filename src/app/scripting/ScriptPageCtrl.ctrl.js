angular.module('app').controller('ScriptPageCtrl', [
  '$scope',
  ScriptPageCtrl
]);

function ScriptPageCtrl ($scope) {
  $scope.name = 'BRIAN';
  $scope.scriptList = [
    {type: 'chapter_break', text: 'Chapter 1 - The Boy Who Lived'},
    {nameToText: 'Professor McGonagall', text: '“You’d be stiff if you’d been sitting on a brick wall all day,”', type: 'speech'},
    {nameToText: 'Narrator', text: 'said Professor McGonagall', type: 'narration'},
    {nameToText: 'Professor Dumbledore', text: '“All day? When you could have been celebrating? I must have passed a dozen feasts and parties on my way here.”'}
  ];
}
