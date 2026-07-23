const express = require("express");
const itemModel = require("../models/item");

const router = express.Router();

//SHOPPING ITEM
//type 	string
//count number
//price number
//user 	string
//id 	string

//SHOPPING API
//GET 		/api/shopping		get shopping ListFormat
//POST		/api/shopping		add new item
//DELETE	/api/shopping/:id	delete item with id
//PUT 		/api/shopping/:id	edit item with id

router.get("/shopping",function(req,res) {
	itemModel.find({"user":req.session.user}).then(function(items) {
		return res.status(200).json(items);
	}).catch(function(err) {
		console.log("Error while fetching shoppinglist. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	});
})

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	const item = new itemModel({
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	})
	item.save().then(function(item) {
		return res.status(201).json(item);
	}).catch(function(err) {
		console.log("Failed to create new item. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log("Error when removing item. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	const item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item).then(function() {
		return res.status(200).json({"Message":"Success"});
	}).catch(function(err){
		console.log("Error when updating an item. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

module.exports = router;