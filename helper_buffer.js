'use strict';

const concat2 = function () {
	let tmp = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		tmp = concat1(tmp, arguments[i]);
	}
	return tmp;
}

const concat1 = function (buf1, buf2) {
	let tmp = new Buffer(buf1.length + buf2.length);
	buf1.copy(tmp, 0);
	buf2.copy(tmp, buf1.length);
	return tmp;
}

const concat3 = function () {
	if (!Buffer.isBuffer(arguments[0])) {
		return concat2.apply(this, arguments[0]);
	}
	return concat2.apply(this, arguments)
}

const concat = function () {
	let args = (arguments.length === 1) ? arguments[0] : arguments;

	let i;
	let sumlen = 0;
	for (i = 0; i < args.length; i++) {
		sumlen += args[i].length;
	}

	let buf = new Buffer(sumlen);
	let pos = 0;
	for (i = 0; i < args.length; i++) {
		args[i].copy(buf, pos);
		pos += args[i].length;
	}

	return buf;
}

module.exports = {
	concat1: concat1,
	concat2: concat2,
	concat3: concat3,
	concat: concat
}