angular.module('app').factory('AllWebServices', [
  'Upload', '$http', 'BookHelper', AllWebServices
]);

function AllWebServices (Upload, $http, BookHelper) {
  const baseUrl = `http://localhost:3333`;
  return {
    uploadBook,
    getBookNames,
    getBlockAndBlobById,
    dataForInitializeScriptPage
  };

  function uploadBook (file, whichFileNameType, customFileName) {
    return Upload.upload({
      url: `${baseUrl}/book_data`,
      data: {
        file,
        customBookName: (whichFileNameType === 'custom' ? customFileName : null)
      }
    });
  }

  function getBookNames () {
    return $http.get(`${baseUrl}/book_data`);
  }

  function getBlockAndBlobById (blockId) {
    if (BookHelper.getBookNameWorkingOn() === null) {
      return alert('NO BOOK NAME SPECIFIED.');
    }
    return $http.get(`${baseUrl}/book_data/${BookHelper.bookNameWorkingOn}/${blockId}`);
  }

  /*
   * return
   *  {snippetById, textBlobById, indexAt, characterList}
   * */
  function dataForInitializeScriptPage () {
    return $http.get(`${baseUrl}/book_data/${BookHelper.bookNameWorkingOn}/${null}/true`);
  }

}
