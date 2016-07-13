angular.module('app').directive('bookText', function () {
  return {
    link,
    templateUrl: 'app/scripting/bookText.html',
    scope: {

    },
    restrict: 'E'
  };

  function link (scope, element) {
    element.on('mouseup', function (e) {
      console.log(e);
    });
  }
});
