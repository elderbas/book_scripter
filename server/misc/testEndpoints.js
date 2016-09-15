"use strict";
let superagent = require('superagent')

// get - book_data/
let url = 'http://localhost:3000';

let blockId = 0
let bookName = 'multiple_name'
superagent.get(`${url}/api/books/block`)
	.query({ blockId, bookName })
	.end((err, res) => {
	  console.log('err', err);
	  console.log('res.body', res.body);
	})


















