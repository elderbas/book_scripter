angular.module('app').directive('snippetDocumenterDropdown', [
  'CollectionHelper',
  'Snippet',
  snippetDocumenterDropdown
]);
/**
 * @ngdoc function
 * @name app.directive:snippetTypeDropdown
 * @description
 * # snippetTypeDropdown
 * Directive of snippetTypeDropdown
 */
function snippetDocumenterDropdown (CollectionHelper, Snippet) {
  let template = `
    <div class="snippet-documenter-dropdown">
      <ul class="snippet-types">
        <li ng-repeat="snippetType in possibleSnippetTypes"
            ng-mouseover="displaySnippetSelectOptions(snippetType, $event, $index)">
          {{snippetType}}
          </li>
      </ul>
      <div class="snippet-confirm">
        <div ng-if="selectedSnippetType === hoverableType" ng-repeat="hoverableType in hoverableToSet" ng-mouseover="setSnippetType(hoverableType)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div ng-if="selectedSnippetType === typeReqCharName" ng-repeat="typeReqCharName in charNameRequiredToSet">
          <ul>
            <li class="available-characters" ng-repeat="charN in characterNames" ng-click="setSnippetType(typeReqCharName, charN)">{{charN}}</li>
          </ul>
          <input ng-model="newCharacterName" type="text" style="float:left; width:85%; background-color: black; color:white;" placeholder="new char name...">
          <!-- TODO would be cool to make this animate from the text box down to the character list below-->
          <span ng-click="addCharacter(newCharacterName); newCharacterName = '';">
            <i class="fa fa-plus" aria-hidden="true" style="display:inline-block;width:12%;vertical-align: bottom; background-color:inherit; color:inherit;"></i>
          </span>
        </div>
      </div>
    </div>
  `;
  return {
    restrict: 'E',
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
    scope.hoverableToSet = ['ignore', 'chapterHeading', 'narration'];
    scope.charNameRequiredToSet = ['thought', 'speech'];

    scope.selectedSnippetType = '';
    scope.newCharacterName = '';
    scope.possibleSnippetTypes = CollectionHelper.getPossibleSnippetTypes().reverse();

    // is either in the 'thought' or 'speech' snippet type, and added a character name
    scope.addCharacter = (newCharacterName) => {
      scope.newCharacterName = '';
      scope.characterNames.push(newCharacterName);
    };

    // figuring out which snippet type to show the confirm box for, and how to position it when rendering it
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
    * @description - user has selected the snippet confirm box of whichever, and this needs to
    *                send it off wherever it needs to go
    * @param snippetType - required
    *
    * */
    scope.setSnippetType = function (snippetType, value) {
      // we have the snippet type they've chosen
      console.log(snippetType, scope.textToExtract, value);
      scope.snippetList.push(new Snippet(snippetType, scope.textToExtract, value));
      scope.removeSelectedTextFromExtractionArea(scope.textToExtract);
      element.find('.snippet-documenter-dropdown').css('visibility', 'hidden');
    };

    let jqueryAnimateOptions = {queue: false, duration: 100};
    element.find('.snippet-documenter-dropdown').on('mouseleave', function (e) {
      element.find('.snippet-documenter-dropdown').animate({
        opacity: 0.1
      }, jqueryAnimateOptions);
    });

    element.find('.snippet-documenter-dropdown').on('mouseenter', function (e) {
      element.find('.snippet-documenter-dropdown').animate({
        opacity: 1
      }, jqueryAnimateOptions);
    });

    /*
    * remove selected text from the extraction area
    * also automatically put any text BEFORE the selected, while still within
    * the work zone, to be set to narration
    * */
    scope.removeSelectedTextFromExtractionArea  = function (textToRemove) {
      console.log('textToRemove', textToRemove);

      // get all of extraction zone text
      var bookText = scope.textBlobWorkZone.textBlobById;
      var textAlreadyThere = bookText.trim(); // get rid of any crap on ends

      // remove any text prior to our selection
      var indexOfStartOfExtractionText = textAlreadyThere.indexOf(textToRemove);
      var textAssumedToBeNarration;
      if (indexOfStartOfExtractionText > 0) {
        textAssumedToBeNarration = textAlreadyThere.slice(0, indexOfStartOfExtractionText);
        scope.snippetList.push(new Snippet('narration', textAssumedToBeNarration));

        textAlreadyThere = textAlreadyThere.slice(indexOfStartOfExtractionText);
      }
      console.log('text to throw away', textAssumedToBeNarration);
      // remove extracted text from extraction zone, put new text back, and add to top
      var textWithoutExtracted = textAlreadyThere.replace(textToRemove, '').trim();
      scope.textBlobWorkZone.textBlobById = textWithoutExtracted;
    }

  }// end link()

}// end snippetTypeDropdown()
