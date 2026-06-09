const express = require("express");

const app = express();

app.use("/",express.static("frontend"));
app.use(express.json());

//DATABASE
let database = [];
let id = 100;

//REST API (CRUD)
//GET 		/api/shopping 		fetch all
//POST		/api/shopping 		add new item
//DELETE 	/api/shopping/:id 	remove item with :id
//PUT 		/api/shopping/:id	edit item with :id

//Item
//id	Number
//type 	String
//count	Number
//price Number

//SHOPPING API

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/shopping",function(req,res) {
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":id
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
});

app.delete("/api/shopping/:id",function(req,res) {
	const tempId = parseInt(req.params.id);
	database = database.filter(item => item.id !== tempId);
	return res.status(200).json({"Message":"Success"})
});

app.put("/api/shopping/:id",function(req,res) {
	const tempId = parseInt(req.params.id);
	const item = {
		"id":tempId,
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

app.listen(3000);
console.log("Running in port 3000");