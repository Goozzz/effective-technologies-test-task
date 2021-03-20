const textField = document.getElementById('searchTextField');
const table = document.getElementById('todoTable');
const checkBox = document.getElementById('tasksCheckBox');

var request = new XMLHttpRequest();

function debounce(func, time) {
	let timer;
	return function() {

		clearTimeout(timer);

		timer = setTimeout(func, time);
	}
}

function processResponse() {
	if (request.readyState == 4 && request.status == 200) {
		let tasks = JSON.parse(request.response);

		let rowsCount = table.rows.length;
		for (let i = 1; i < rowsCount; i++) {
			table.deleteRow(1);
		}

		for (task of tasks) {
			let row = table.insertRow();

			let idCell = row.insertCell(-1);
			idCell.className = "idCell"
			idCell.innerHTML = task.id;

			let titleCell = row.insertCell(-1);
			titleCell.innerHTML = task.title;

			if (task.completed) {
				titleCell.style.textDecoration = "line-through";
			}
		}
	}
}

request.onload = () => processResponse();

var sendRequest = function() {

	let url =  "http://localhost:8080/";
	url += '?title=' + textField.value;
	url += '&checked=' + checkBox.checked;
	
	request.open("GET", url);
	request.send();
};

textField.oninput = debounce(sendRequest, 250);
checkBox.onchange = debounce(sendRequest, 150);