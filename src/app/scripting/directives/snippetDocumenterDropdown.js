angular.module('app').directive('snippetDocumenterDropdown', [
  'CollectionHelper',
  snippetDocumenterDropdown
]);
/**
 * @ngdoc function
 * @name app.directive:snippetTypeDropdown
 * @description
 * # snippetTypeDropdown
 * Directive of snippetTypeDropdown
 */
function snippetDocumenterDropdown (CollectionHelper) {
  let template = `
    <div class="snippet-documenter-dropdown">
      <ul class="snippet-types">
        <li ng-repeat="snippetType in possibleSnippetTypes"
            ng-mouseover="displaySnippetSelectOptions(snippetType, $event, $index)">
          {{snippetType}}
          </li>
      </ul>
      <div class="snippet-confirm">
        <div ng-if="selectedSnippetType === 'ignore' " ng-mouseover="setSnippetType('ignore')"><i class="fa fa-check" aria-hidden="true"></i></div>
        <div ng-if="selectedSnippetType === 'chapterHeading' " ng-mouseover="setSnippetType('chapterHeading')"><i class="fa fa-check" aria-hidden="true"></i></div>
        <div ng-if="selectedSnippetType === 'narration' " ng-mouseover="setSnippetType('narration')"><i class="fa fa-check" aria-hidden="true"></i></div>
        <div ng-if="selectedSnippetType === 'thought' ">
          <!-- character list should become a directive -->
          <ul><li></li></ul>
          <input ng-model="newCharacterName" type="text" style="float:left;width:85%;">
          <!-- TODO would be cool to make this animate from the text box down to the character list below-->
          <span ng-click="addCharacter(newCharacterName); newCharacterName = '';">
            <i class="fa fa-plus" aria-hidden="true" style="display:inline-block;width:12%;vertical-align: bottom;"></i>
          </span>
        </div>
      </div>
    </div>
  `;
  return {
    restrict: 'E',
    scope: {},
    template,
    link
  };

  /* TODO - UX
  * when it's active, but the user hasn't selected something yet, if mouse out of UL, then
  * change color of it all to ghost, so they see it's there, but maybe they want to look where the
  * text is that they just selected
  * */
  function pxNumToInt (str) {
    return parseInt(str.replace('px', ''), 10);
  }

  function link (scope, element) {
    scope.selectedSnippetType = '';
    scope.newCharacterName = '';
    scope.possibleSnippetTypes = CollectionHelper.getPossibleSnippetTypes().reverse();

    scope.addCharacter = (newCharacterName) => {
      scope.newCharacterName = '';
      console.log('newCharacterName!!', newCharacterName);
    };

    scope.displaySnippetSelectOptions = (snippetType, event, index) => {
      scope.selectedSnippetType = snippetType;
      let liSnippetTypeSelected = angular.element(event.target);
      element.find('.snippet-confirm').css({
        left: liSnippetTypeSelected.css('width'),
        top: index * pxNumToInt(liSnippetTypeSelected.css('height')) + (index === 0 ? -1 : 1),
        display: 'block',
        position: 'absolute',
        width: '200px',
        border: '1px solid black'
      });
    };

    /*
    * @param snippetType - required
    *
    * */
    scope.setSnippetType = function (snippetType) {
      // we have the snippet type they've chosen
      element.find('.snippet-documenter-dropdown').css('visibility', 'hidden');
    };

    //let jqueryAnimateOptions = {queue: false, duration: 200};
    //element.on('mouseleave', function (e) {
    //  element.animate({
    //    opacity: 0.05
    //  }, jqueryAnimateOptions);
    //});

    //element.on('mouseenter', function (e) {
    //  element.animate({
    //    opacity: 1
    //  }, jqueryAnimateOptions);
    //});

    //$(document).click(function(e) {
    //  if(!$(e.target).closest('.snippet-document-dropdown').length) {
    //    if($('.snippet-document-dropdown').is(":visible")) {
    //      $('.snippet-document-dropdown').hide();
    //    }
    //  }
    //})

  }// end link()


}// end snippetTypeDropdown()
