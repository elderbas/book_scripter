"use strict";
let request = require('request');

// get - book_data/
let url = 'http://localhost:3333';
request.get(`${url}/book_data/`, function (err, httpResp, body) {
	if (err) { return console.log('err', err); }

	let firstBookName = JSON.parse(body)[0];
	console.log(firstBookName);
	
	request.get(`${url}/book_data/status/${firstBookName}`, (err, httpR, body) => {
		console.log(body);
	});
});


