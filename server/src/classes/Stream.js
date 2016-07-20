"use strict";

let possibleTypeValues = ['narration', 'speech', 'thought', 'parsingError'];
// default set these all to null
class Stream {
  constructor(oci, cci, type) {
    this.openCharIndex = (oci === undefined) ? null: oci;
    this.closeCharIndex = (cci === undefined) ? null: cci;
    this.type = (type === undefined) ? null: type;
  }

  getFinishedStream () {
    if (_.some([this.openCharIndex, this.closeCharIndex, this.type], x => x === null)) {
      throw new Error('cant get a finished stream when one of its props are null')
    }
    else {
      return this;
    }
  }

}//end class Stream
module.exports = Stream;