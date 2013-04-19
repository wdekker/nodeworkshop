var fs = require('fs');
var readline = require('readline').createInterface(process.stdin, process.stdout);

readline.question("Hi, what's your name? ", function(anwser) {
	var data = readData();
	if (data[anwser] == undefined) {
		console.log("Oh hello " + anwser + ", I will try to remember you.");
		data[anwser] = 0;
	} else {
		console.log("Hi again " + anwser + ", you've visited us " + data[anwser] + " times before");
	}
	data[anwser] = data[anwser] +1;
	writeData(data);
	readline.close();
});

function readData() {
	var data = new Object();
	if (fs.existsSync("remember.json")) {
		var dataString = fs.readFileSync("remember.json");
		data = JSON.parse(dataString);
	}
	return data;
}

function writeData(data) {
	fs.writeFile("remember.json", JSON.stringify(data));
}