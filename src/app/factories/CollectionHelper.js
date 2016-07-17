angular.module('app').factory('CollectionHelper', [
  CollectionHelper
]);

function CollectionHelper () {
  return {
    getPossibleSnippetTypes
  };

  function getPossibleSnippetTypes () {
    return [
      'speech', 'thought', 'narration', 'chapterHeading', 'ignore'
    ];
  }
}// end function CollectionHelper
