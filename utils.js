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

module.exports.generateTableBody = generateTableBody;