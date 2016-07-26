'use strict';

const http = require('http');

function handler_req (res) {
	let body = '';
	console.log('STATS: %d\nHEADERS:%j', res.statusCode, res.headers);
	res.setEncoding('utf8');

	res.on('data', (chuck) => {
		body += chuck;
	});

	res.on('end', () => {
		console.log('BODY: ' + body);
	})
}

let data = {
	name: '中文'
};

data = JSON.stringify(data);

console.log('data.length: %d', data.length);
console.log('Buffer.byteLength(data, "utf8"): %d', Buffer.byteLength(data, 'utf8'));

const context_type = 'application/json;';
const options = {
	hostname: '127.0.0.1',
	port: 3000,
	path: '/req',
	method: 'POST',
	headers: {
		//'COntent-Length': data.length,
		'COntent-Length': Buffer.byteLength(data, 'utf8'),
		'Content-Type': context_type
	}
};

const req = http.request(options, handler_req);

req.on('error', (err) => {
	console.trace();
	console.log('err.name: %s', err.name);
	console.log('err.message: %s', err.message);
});

req.write(data);
req.end();