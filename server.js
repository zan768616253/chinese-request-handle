'use strict';

const http = require('http');
const fs = require('fs');
const url_parser = require('url');
const util = require('util');

function get_post(req, res) {
	req.setEncoding('utf8');

	const url_object = url_parser.parse(req.url);
	let res_data = {
		id: null,
		nbr: 1
	};

	let data = '';

	function onData (chuck) {
		data += chuck;
	}

	function onEnd () {
		console.log('data: %s', data);
		res_data = JSON.parse(data);
		const str = JSON.stringify(res_data);
		console.log('send: ' + str);
		res.write(str + '\n');
		res.end();

		fs.writeFile('message.txt', 'Data: ' + data + '\n', {flag: 'a'}, (err) => {
			if (err) {
				console.log('have error: %s', err.message);
			}
			console.log('saved');
		})
	}

	if (url_object.pathname == '/req' && req.method === 'POST') {
		req.addListener('data', onData);
		req.addListener('end', onEnd);
	} else {
		res.end();
	}
}

const server = http.createServer(get_post);
const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);
console.log('server running at: %s:%d', ip, port);
