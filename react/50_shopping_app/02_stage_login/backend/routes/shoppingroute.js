const express = require("express");

const router = express.Router();

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

router.get("/shopping",function(req,res) {
	return res.status(200).json(database);
})

router.post("/shopping",function(req,res) {
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:id
	}
	id++;
	database.push(item);
	console.log(database);
	return res.status(201).json(item);
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	database = database.filter(item => item.id !== tempId);
	return res.status(200).json({"Message":"Success"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"})
		}
	}
	return res.status(404).json({"Message":"Not found"})
})

module.exports = router;