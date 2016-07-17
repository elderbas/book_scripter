angular.module('app').factory('BookHelper', [
  BookFactory
]);

function BookFactory () {
  return {
    bookNameWorkingOn: null
  };
}
