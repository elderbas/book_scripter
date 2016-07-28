'use strict';

class CharacterProfile {
  constructor (displayName, aliases) {
    if (typeof aliases === 'string') {
      aliases = [aliases];
    }
    else if (aliases === undefined) {
      aliases = [];
    }
    this.displayName = displayName;
    this.aliases = aliases;
  }
}

module.exports = CharacterProfile;