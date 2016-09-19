'use strict';

class CharacterProfile {
  /*
  * displayName - string
  * aliases - array of strings
  * */
  constructor (displayName, aliases, id) {
    if (typeof aliases === 'string') {
      aliases = [aliases];
    }
    else if (aliases === undefined) {
      aliases = [];
    }
    this.displayName = displayName
    this.aliases = aliases
    this.id = id
  }
}

module.exports = CharacterProfile;