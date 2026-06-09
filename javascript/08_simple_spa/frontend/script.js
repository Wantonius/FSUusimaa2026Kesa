var mode = 0;

window.onload = function() {
	createForm();
	getList();
}

const createForm = () => {
	const root = document.getElementById("root");
	const boundingDiv = document.createElement("div");
	boundingDiv.style.maxWidth = "40%";
	boundingDiv.style.backgroundColor = "pink";
	boundingDiv.style.margin = "auto";
	boundingDiv.style.textAlign = "center";
	const form = document.createElement("form");
	form.setAttribute("class","m-3");
	
	//Type label and input
	const typeLabel = document.createElement("label");
	typeLabel.setAttribute("for","type");
	typeLabel.setAttribute("class","form-label");
	const typeLabelText = document.createTextNode("Type");
	typeLabel.appendChild(typeLabelText);
	const typeInput = document.createElement("input");
	typeInput.setAttribute("type","text");
	typeInput.setAttribute("id","type");
	typeInput.setAttribute("name","type");
	typeInput.setAttribute("class","form-control");

	//Count label and input
	const countLabel = document.createElement("label");
	countLabel.setAttribute("for","count");
	countLabel.setAttribute("class","form-label");
	const countLabelText = document.createTextNode("Count");
	countLabel.appendChild(countLabelText);
	const countInput = document.createElement("input");
	countInput.setAttribute("type","number");
	countInput.setAttribute("id","count");
	countInput.setAttribute("name","count");
	countInput.setAttribute("class","form-control");
	
	//Price label and input
	const priceLabel = document.createElement("label");
	priceLabel.setAttribute("for","price");
	priceLabel.setAttribute("class","form-label");
	const priceLabelText = document.createTextNode("Price");
	priceLabel.appendChild(priceLabelText);
	const priceInput = document.createElement("input");
	priceInput.setAttribute("type","number");
	priceInput.setAttribute("name","price");
	priceInput.setAttribute("id","price");
	priceInput.setAttribute("step","0.01");
	priceInput.setAttribute("class","form-control");
	
	const submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("id","submitbutton");
	submitButton.setAttribute("name","submitbutton");
	submitButton.setAttribute("value","Add");
	
	form.append(typeLabel,typeInput,countLabel,countInput,priceLabel,priceInput,submitButton)
	form.addEventListener("submit",function(e) {
		e.preventDefault();
		addItem();
	})

	boundingDiv.appendChild(form);
	root.appendChild(boundingDiv);
}

const addItem = async () => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	
	const item = {
		"type":typeInput.value,
		"count":countInput.value,
		"price":priceInput.value
	}
	let url = "/api/shopping";
	let request = {
		"method":"POST",
		"headers":{"Content-type":"application/json"},
		"body":JSON.stringify(item)
	}
	if(mode) {
		request.method = "PUT";
		url = "/api/shopping/"+mode
	}
	const response = await fetch(url,request);
	if(response.ok) {
		typeInput.value = "";
		countInput.value = "";
		priceInput.value = "";
		mode = 0;
		const submitButton = document.getElementById("submitbutton");
		submitButton.value = "Add";
		getList();
	} else {
		console.log("Server responded with a status "+response.status+
		" "+response.statusText)
	}
}

const getList = async () => {
	const response = await fetch("/api/shopping");
	if(response.ok) {
		const list = await response.json();
		if(list) {
			populateTable(list);
		}
	} else {
		console.log("Server responded with a status "+response.status+
		" "+response.statusText)
	}
}

const removeItem = async (id) => {
	const url = "/api/shopping/"+id
	const request = {
		"method":"DELETE"
	}
	const response = await fetch(url,request);
	if(response.ok) {
		getList();
	} else {
		console.log("Server responded with a status "+response.status+
		" "+response.statusText)
	}
}

const editItem = (item) => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	typeInput.value = item.type;
	countInput.value = item.count;
	priceInput.value = item.price;
	mode = item.id;
	const submitButton = document.getElementById("submitbutton");
	submitButton.value = "Save";
}

const populateTable = (list) => {
	const root = document.getElementById("root");
	const oldTable = document.getElementById("table");
	if(oldTable) {
		root.removeChild(oldTable);
	}
	
	const table = document.createElement("table");
	table.setAttribute("class","table table-striped");
	table.setAttribute("id","table");
	
	//headers
	
	const header = document.createElement("thead");
	const headerRow = document.createElement("tr");
	
	//type header
	const typeHeader = document.createElement("th");
	const typeHeaderText = document.createTextNode("Type");
	typeHeader.appendChild(typeHeaderText);
	
	//count header
	const countHeader = document.createElement("th");
	const countHeaderText = document.createTextNode("Count");
	countHeader.appendChild(countHeaderText);
	
	//price header
	const priceHeader = document.createElement("th");
	const priceHeaderText = document.createTextNode("Price");
	priceHeader.appendChild(priceHeaderText);
	
	//remove header
	const removeHeader = document.createElement("th");
	const removeHeaderText = document.createTextNode("Remove");
	removeHeader.appendChild(removeHeaderText);

	//edit header
	const editHeader = document.createElement("th");
	const editHeaderText = document.createTextNode("Edit");
	editHeader.appendChild(editHeaderText);

	headerRow.append(typeHeader,countHeader,priceHeader,removeHeader,editHeader);
	header.appendChild(headerRow);
	table.appendChild(header);

	//table body
	const body = document.createElement("tbody");
	for(let i=0;i<list.length;i++) {
		const row = document.createElement("tr");
		for(x in list[i]) {
			if(x === "id") {
				continue;
			}
			const column = document.createElement("td");
			const info = document.createTextNode(list[i][x]);
			column.appendChild(info);
			row.appendChild(column);
		}
		
		const removeColumn = document.createElement("td");
		const removeButton = document.createElement("button");
		removeButton.setAttribute("class","btn btn-danger");
		const removeText = document.createTextNode("Remove");
		removeButton.appendChild(removeText);
		removeButton.addEventListener("click",function(e) {
			removeItem(list[i].id);
		})
		removeColumn.appendChild(removeButton);
	
		const editColumn = document.createElement("td");
		const editButton = document.createElement("button");
		editButton.setAttribute("class","btn btn-secondary");
		const editText = document.createTextNode("Edit");
		editButton.appendChild(editText);
		editButton.addEventListener("click",function(e) {
			editItem(list[i]);
		})
		editColumn.appendChild(editButton);
		
		row.append(removeColumn,editColumn);
		body.appendChild(row);
	}
	table.appendChild(body);
	root.appendChild(table);
}