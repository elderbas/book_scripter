
angular.module('app').directive('bookText', [
  'CollectionHelper',
  bookText
]);

function bookText (CollectionHelper) {
  return {
    link,
    templateUrl: 'app/scripting/bookText.html',
    scope: {
      textBlobWorkZone: '='
    },
    restrict: 'E'
  };

  // http://unicode-table.com/en/201C/
  function link (scope, element) {


    element.on('mouseup', function () {
      // on mouseup, show up dropbox close to mouse position
      let textToExtract = $.selection();
      if (textToExtract.trim() === '') {return;}
      console.log('textToExtract', textToExtract);
    });

    element.on('dblclick', function () {
      // on mouseup, show up dropbox close to mouse position
      let textToExtract = $.selection();
      if (textToExtract.trim() === '') {return;}
      console.log('textToExtract', textToExtract);
    });
  }
}
