"use strict";
var fs = require('fs');
var dataStore = loadData();

exports.increaseVisits = function (name) {
	if (dataStore[name] === undefined) {
		dataStore[name] = 0;
	}
	dataStore[name] += 1;
	persist(dataStore);
	return dataStore[name];
};

function loadData() {
	var data = {};
	if (fs.existsSync("remember.json")) {
		var dataString = fs.readFileSync("remember.json");
		data = JSON.parse(dataString);
	}
	return data;
}

function persist(data) {
	fs.writeFile("remember.json", JSON.stringify(data));
}