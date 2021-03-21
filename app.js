const express = require('express');

const storage = require('./storage');
const utils = require('./utils');

const arr = storage.data;
const mainPage = utils.preparePage(arr);

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
		response.send(mainPage);
	}
});

app.listen(8080);