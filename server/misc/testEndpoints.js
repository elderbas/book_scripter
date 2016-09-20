"use strict";
let superagent = require('superagent')

// get - book_data/
let url = 'http://localhost:3000';

let bookName = 'got_piece'
superagent.get(`${url}/api/books/json`)
	.query({ bookName })
	.end((err, res) => {
	  console.log('err', err);
	  console.log('res.body', res.body);
	})


















