angular.module('app').factory('BookHelper', [
  '$cookies',
  BookFactory
]);

function BookFactory ($cookies) {
  let bookNameWorkingOn = $cookies.get('bookNameWorkingOn') || null;
  return {
    setNewBookNameWorkingOn,
    getBookNameWorkingOn
  };

  function setNewBookNameWorkingOn (newBookName) {
    $cookies.put('bookNameWorkingOn', newBookName);
    bookNameWorkingOn = newBookName;
  }
  function getBookNameWorkingOn () {
    return bookNameWorkingOn;
  }

}// end function BookFactory
