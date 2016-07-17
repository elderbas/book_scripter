angular.module('app').controller('BookUploadCtrl', [
  '$scope',
  '$timeout',
  'AllWebServices',
  'BookHelper',
  '$location',
  BookUploadCtrl
]);
// https://github.com/danialfarid/ng-file-upload
function BookUploadCtrl ($scope, $timeout, AllWebServices, BookHelper, $location) {
  $scope.whichFileNameType = 'default';
  fillInBookNames();

  function fillInBookNames () {
    AllWebServices.getBookNames().then(function (resp) {
      $scope.bookNamesList = resp.data;
    });
  }

  $scope.directToWorkPage = bookName => {
    console.log('clicked on book name to go to!!!', bookName);
    // save somewhere this book name in a more "globalyish" variable
    BookHelper.bookNameWorkingOn = bookName;
    // redirect page to the work page for this book
    $location.path('/scripting');
  };

  $scope.validateBookName = () => {
    if ($scope.whichFileNameType === 'default') {
      return true;
    } else if ($scope.whichFileNameType === 'custom' && !$scope.customBookName) {
      console.error('Whoops. Forgot a book name.');
      return false;
    }
    return true;
  };
  $scope.uploadFile = function(file, errFiles) {
    if (!$scope.validateBookName()) {
      return false;
    }

    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      console.log('making the call');
      // oh no - bad practice here. somebody get a noose
      file.upload = AllWebServices.uploadBook(file, $scope.whichFileNameType, $scope.customBookName);
      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = `${response.status}: ${response.data}`;
        }
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total, 10));
      });
    }
  };
}
