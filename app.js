const express = require('express');
const fs = require('fs');

const storage = require('./storage');
const utils = require('./utils');

const arr = storage.data;

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response) {
	
	if (request.query.title != undefined) {

		let title = request.query.title.toLowerCase();
		let isChecked = (request.query.checked == 'true');

		let filteredArr = arr.filter(toDo => (toDo.title.toLowerCase().indexOf(title) != -1) 
														&& (isChecked ? !toDo.completed : true));
		
		response.status(200).json(filteredArr);
	} else {
		let filteredArr = arr.filter(toDo => !toDo.completed);
		let tableBody = utils.generateTableBody(filteredArr);
		let content = fs.readFileSync("./views/main.html", "utf8");
		let htmlContent = content.replace("{{tableBody}}", tableBody);

		response.send(htmlContent);
	}
});

app.listen(8080);