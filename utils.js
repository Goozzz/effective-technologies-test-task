const fs = require('fs');

function generateTableBody(arr) {
	let tableBody = ""

	for (item of arr) {
		let row = "<tr>";
		let idCell = "<td class='idCell'>" + item.id + "</td>";
		let titleCell = "<td>" + item.title + "</td>";
		row = row + idCell + titleCell + "</tr>";
		tableBody += row;
	}
	
	return tableBody;
}

function preparePage(arr) {
	let mainPage = fs.readFileSync("./views/main.html", "utf8");
	let filteredArr = arr.filter(toDo => !toDo.completed);
	let tableBody = generateTableBody(filteredArr);
	let resultPage = mainPage.replace("{{tableBody}}", tableBody);

	return resultPage;
}

module.exports.preparePage = preparePage;;