angular.module('app').controller('BookUploadCtrl', [
  '$scope',
  'Upload',
  '$timeout',
  BookUploadCtrl
]);
// https://github.com/danialfarid/ng-file-upload
function BookUploadCtrl ($scope, Upload, $timeout) {
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: 'http://localhost:3333/book_data',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    }
  }
}
