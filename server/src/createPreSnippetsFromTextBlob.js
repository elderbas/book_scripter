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
const createPreSnippetFromTextBlob = (textBlob) => {
  let preSnippets = [], currentChar, currentStream = {tentativeType: null, startI: null};
  let streamStarted = false,
    currCharI,
    len;

  for (currCharI = 0, len = textBlob.length; currCharI < len; ++currCharI) {
    currentChar = textBlob.charAt(currCharI);
    if (!streamStarted) {
      // categorize what kind of tentative type it is based on the new character with the new stream we have to start
      if (currentChar === '“') {
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
    }

    // if we're here we can assume we're in the middle of a stream type
    // as long as we don't come across a stream terminating character for speech, just keep going
    // CHECK FOR STREAM TERMINATING CHARACTER
    if (currentStream.tentativeType === 'speech') {
      handleSpeechTentative();
    }
    else if (currentStream.tentativeType === 'whitespace') {
      handleWhitespaceTentative();
    }
    else if (currentStream.tentativeType === 'narration') {
      handleNarrationTentative();
    }
  }// end for loop
  
  
  // handle straggling chars
  if (currentStream.tentativeType === 'whitespace') {
    preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, len), 'whitespace'))
  }
  
  return preSnippets;

  function handleNarrationTentative () {
    if (currentChar === CLOSE_QUOTE) { // shouldn't be coming up on this in middle of 'narration'
      preSnippets.push(new PreSnippet(textBlob.slice(currentStream.startI, currCharI + 1), 'parseError'));
      streamStarted = false;
      currentStream.tentativeType = null;
    }
  }

  function handleWhitespaceTentative () {
    if (/[A-z']/.test(currentChar)) { // if we detect we've started a 'narration' type
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


