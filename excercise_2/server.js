"use strict";
var http = require('http'),
url = require('url'),
repository = require('./repository');
var index = require('fs').readFileSync('index.html');

http.createServer(function (req, res) {
	var name = getName(req);
	if (name !== undefined) {
		handleName(name, res);
	} else {
		handleIndex(res);
	}
	res.end();
}).listen(1337, '127.0.0.1');

function getName(req) {
	var parsed = url.parse(req.url, true);
	return parsed.query.name;
}

function handleIndex(res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(index);
}

function handleName(name, res) {
	var count = repository.increaseVisits(name);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Oh hello ' + name + ' this is the ' + count + ' time you have visited us');
}

console.log('Server running at http://127.0.0.1:1337/');