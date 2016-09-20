let _ = require('lodash');
'use strict';


let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let models = {};

let characterProfileSchema = new Schema({
  displayName: String, // this needs to be unique but I'm not sure how to enforce uniqueness, except at the application level
  aliases: [String]
});

/*blocks
 *  {
 *   snippets: [],
 *   preSnippets: [],
 *   status: ''
 *  }
 * */
let bookSchema = new Schema({
  bookName: {type: String, unique: true, required: true},
  blocks: {type: Array, default: []},
  lastBlockIndexWorkedOn: {type: Number, default: 0},
  characterProfiles: [characterProfileSchema],
  verbSpokeSynonyms: [String]
});

/*
* This is a working around to an error that was coming up in the
* test with 'mocha -w server/test/uat/bookFlow.spec.js'
* */
try {
  models.Books = mongoose.model('books', bookSchema);
}
catch (e) {
  models.Books = mongoose.model('books');
}
module.exports = models;



