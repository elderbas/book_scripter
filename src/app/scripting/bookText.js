
angular.module('app').directive('bookText', [
  bookText
]);

function bookText () {
  let template = `
    <snippet-documenter-dropdown text-to-extract="textToExtract"></snippet-documenter-dropdown>
    <section class="book-text-container" style="white-space: pre-line;">
        {{textBlobWorkZone.textBlobById}}
    </section>
  `;

  return {
    link,
    template,
    restrict: 'E'
  };

  // http://unicode-table.com/en/201C/
  function link (scope, element) {
    function positionSnippetDropdown (currentX, currentY) {
      /* this logic should probably be inside the directive for 'snippetDocumenterDropdown' */
      element.find('.snippet-documenter-dropdown').css({
        visibility: 'visible',
        opacity: 0.1,
        left: `${currentX + 2}px`,
        top: `${currentY - 102}px`
      });
    }

    element.on('mouseup', function (e) {
      console.log('event object passed in', e);
      // on mouseup, show up dropbox close to mouse position
      if ($.selection().trim() === '') {return;}
      scope.textToExtract = $.selection().trim();
      console.log('scope.textToExtract', scope.textToExtract);
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
