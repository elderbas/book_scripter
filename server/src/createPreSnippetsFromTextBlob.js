/*
* This likely stands to reduce a few lines of code by refactoring
* */

let PreSnippet = require('./classes/PreSnippet.js');
/**
 * Parses the piece of book text (textBlob) into classified snippets of
 * categorized text as either whitespace, speech, or narration. This will
 * help other analyzer functions figure out patterns for what to highlight for the
 * user and what to look for names from etc.
 * @param {str} textBlob
 * @returns {PreSnippet[]}
 */
const OPEN_QUOTE = '“';
const CLOSE_QUOTE = '”';
// a narration type can't have a trailing white space, this will help keep track of the last index
// where a narration had a non ws char
let isNarrableNonWsChar = (char) => (/[^\s]/.test(char) && char !== OPEN_QUOTE && char !== CLOSE_QUOTE);

const createPreSnippetFromTextBlob = (textBlob) => {
  let preSnippets = [], currentChar, currentStream = {tentativeType: null, startI: null};
  let streamStarted = false, currCharI, len, lastNarrableNonWSIndex;
  let whichTentativeHandle = {
    speech: handleSpeechTentative,
    whitespace: handleWhitespaceTentative,
    narration: handleNarrationTentative,
    'undefined': function () {},
    'null': function () {},
  };
  for (currCharI = 0, len = textBlob.length; currCharI < len; ++currCharI) {
    currentChar = textBlob.charAt(currCharI);
    if (!streamStarted) {
      // categorize what kind of tentative type it is based on the new character with the new stream we have to start
      if (currentChar === OPEN_QUOTE) {
        currentStream.tentativeType = 'speech';
        currentStream.startI = currCharI;
        streamStarted = true;
        continue;
      }
      else if (/[\s]/.test(currentChar)) {
        currentStream.tentativeType = 'whitespace';
        currentStream.startI = currCharI;
        streamStarted = true;
        continue;
      }
      else if (isNarrableNonWsChar(currentChar)) {
        currentStream.tentativeType = 'narration';
        currentStream.startI = lastNarrableNonWSIndex = currCharI;
        streamStarted = true;
        continue;
      }
    }

    // if we're here we can assume we're in the middle of a stream type
    // as long as we don't come across a stream terminating character for speech, just keep going
    // CHECK FOR STREAM TERMINATING CHARACTER
    whichTentativeHandle[currentStream.tentativeType]()
  }// end for loop
  
  
  // handle straggling chars
  if (currentStream.tentativeType === 'whitespace') {
    preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, len), 'whitespace'))
  }
  else if (currentStream.tentativeType === 'narration') {
    preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, len), 'narration'))
  }
  
  return preSnippets;

  // meaning, the currentStream is of this type when it is inspecting the currentChar in question
  function handleNarrationTentative () {
    if (isNarrableNonWsChar(currentChar)) {
      lastNarrableNonWSIndex = currCharI;
    }
    else if (currentChar === CLOSE_QUOTE) { // shouldn't be coming up on this in middle of 'narration'
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI + 1), 'parseError'));
      streamStarted = false;
      currentStream.tentativeType = null;
    }
    else if (currentChar === OPEN_QUOTE) { // this might need to be for new lines too
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, lastNarrableNonWSIndex+1), 'narration'));
      streamStarted = false;
      currentStream.tentativeType = null;
      currCharI = lastNarrableNonWSIndex; // flip it back and let it figure out what it needs to after point of non narration
    }
    else if (currentChar === '\n') {
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI), 'narration'));
      currentStream.tentativeType = 'whitespace';
      currentStream.startI = currCharI;
    }
  }

  function handleWhitespaceTentative () {
    if (isNarrableNonWsChar(currentChar)) { // if we detect we've started a 'narration' type
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI), 'whitespace'));
      // keep streamStarted true
      currentStream.tentativeType = 'narration';
      currentStream.startI = currCharI;
    }
    else if (currentChar === OPEN_QUOTE) { // if we detect start of new 'speech'
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI), 'whitespace'));
      // keep .tentativeType as 'speech' tentative type since we're opening a new speech stream
      // also keep streamStarted as true
      currentStream.tentativeType = 'speech';
      currentStream.startI = currCharI;
    }
  }

  function handleSpeechTentative () {
    if (currentChar === CLOSE_QUOTE) { // just close it and start stream over
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI + 1), 'speech'));
      streamStarted = false;
      currentStream.tentativeType = null;
    }
    // make tentativeType -> 'parseError'
    else if (currentChar === OPEN_QUOTE) {
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI), 'parseError'));
      // keep .tentativeType as 'speech' tentative type since we're opening a new speech stream
      // also keep streamStarted as true
      currentStream.startI = currCharI;
    }
    else if (currentChar === '\n') {
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI), 'parseError'));
      // keep streamStarted as true because we'll make the currentStream whitespace now
      currentStream.tentativeType = 'whitespace';
      currentStream.startI = currCharI;
    }

  }//end handleSpeechTentative()
};//end createPreSnippetFromTextBlob()


module.exports = createPreSnippetFromTextBlob;


