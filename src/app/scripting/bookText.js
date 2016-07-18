
angular.module('app').directive('bookText', [
  bookText
]);

function bookText () {
  let template = `
    <snippet-documenter-dropdown></snippet-documenter-dropdown>
    <section class="book-text-container" style="white-space: pre-line;">
        {{textBlobWorkZone.textBlobById}}
    </section>
  `;

  return {
    link,
    template,
    scope: {
      textBlobWorkZone: '='
    },
    restrict: 'E'
  };

  // http://unicode-table.com/en/201C/
  function link (scope, element) {
    function positionSnippetDropdown (currentX, currentY) {
      element.find('.snippet-documenter-dropdown').css({
        visibility: 'visible',
        left: `${currentX + 2}px`,
        top: `${currentY - 102}px`
      });
    }

    element.on('mouseup', function (e) {
      // on mouseup, show up dropbox close to mouse position
      let textToExtract = $.selection();
      if (textToExtract.trim() === '') {return;}
      console.log('textToExtract', textToExtract);
      positionSnippetDropdown(e.pageX, e.pageY);
    });

    //element.on('dblclick', function (e) {
    //  // on mouseup, show up dropbox close to mouse position
    //  let textToExtract = $.selection();
    //  if (textToExtract.trim() === '') {return;}
    //  console.log('textToExtract', textToExtract);
    //});
  }
}
