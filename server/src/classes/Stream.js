"use strict";
let possibleTypeValues = ['narration', 'speech', 'thought', 'parsingError'];
// default set these all to null
class Stream {
  constructor(oci, cci, type) {
    this.openCharIndex = (oci === undefined) ? null: oci;
    this.closeCharIndex = (cci === undefined) ? null: cci;
    this.type = (type === undefined) ? null: type;
  }

  getAndValidateFinishedStream () {
    if (_.some([this.openCharIndex, this.closeCharIndex, this.type], null)) {
      throw new Error('cant get a finished stream when one of its props are null')
    }
    else {
      return this;
    }
  }

}//end class Stream

//function Stream (oci, cci, type) {
//  this.openCharIndex = (oci === undefined) ? null : oci;
//  this.closeCharIndex = (cci === undefined) ? null : cci;
//  this.type = (type === undefined) ? null : type;
//}
module.exports = Stream;