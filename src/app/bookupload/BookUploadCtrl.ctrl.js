angular.module('app').controller('BookUploadCtrl', [
  '$scope',
  'Upload',
  '$timeout',
  BookUploadCtrl
]);
// https://github.com/danialfarid/ng-file-upload
function BookUploadCtrl ($scope, Upload, $timeout) {
  $scope.whichFileName = 'default';

  $scope.validateBookName = () => {
    if ($scope.whichFileName === 'default') {
      return true;
    } else if ($scope.whichFileName === 'custom' && !$scope.customBookName) {
      console.error('Whoops. Forgot a book name.');
      return false;
    }
    return true;
  };
  $scope.uploadFile = function(file, errFiles) {
    console.log('inside upload file');
    if (!$scope.validateBookName()) {
      return false;
    }

    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      console.log('making the call');
      file.upload = Upload.upload({
        url: 'http://localhost:3333/book_data',
        data: {
          file,
          customBookName: ($scope.whichFileName === 'custom' ? $scope.customBookName : null)
        }
        // data: {file}
      });

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
