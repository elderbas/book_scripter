angular.module('app').directive('bookText', function () {
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
      console.log($.selection().charCodeAt(0));

      console.log(element.text());
    });
  }
});
