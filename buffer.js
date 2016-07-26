'use strict';

const fs = require('fs');

let rs1_data = '';
let rs2_data = '';

let buffers = [];
let nread = 0;

const rs1 = fs.createReadStream('test_data_buffer.md');
const rs2 = fs.createReadStream('test_data_buffer.md');

rs1.on('data', (trunk) => {
	rs1_data += trunk;
});

rs1.on('end', () => {
	console.log(rs1_data);
});

rs2.on('data', (trunk) => {
	buffers.push(trunk);
	nread += trunk.length;
})

rs2.on('end', () => {
	let buffer = null;
	switch(buffers.length) {
		case 0:
			buffer = new Buffer(0);
			break;
		case 1:
			buffer = buffers[0];
			break;
		default:
			buffer = new Buffer(nread);
			for (let i = 0, pos = 0; i < buffers.length; i++) {
				let chunk = buffers[i];
				chunk.copy(buffer, pos);
				pos += chunk.length;
			}
			break;
	}

	console.log(buffer.toString());
});