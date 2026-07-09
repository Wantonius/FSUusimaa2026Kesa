const express = require("express");

const app = express();

app.use(express.json());

//DATABASE
let database = [];
let id = 100;

//SHOPPING ITEM
//type string
//count number
//price number
//id number

//SHOPPING API
//GET 		/api/shopping		get shopping ListFormat
//POST		/api/shopping		add new item
//DELETE	/api/shopping/:id	delete item with id
//PUT 		/api/shopping/:id	edit item with id

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

app.listen(3000);

console.log("Running in port 3000");