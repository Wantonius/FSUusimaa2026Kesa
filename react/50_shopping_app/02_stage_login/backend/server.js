const express = require("express");
const router  = require("./routes/shoppingroute");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

const app = express();

app.use(express.json());

//DATABASE CONNECTION

mongoose.connect("mongodb://localhost/shoppingdatabase").then(
	() => console.log("Connected to Mongodb"),
	(err) => console.log("Failed to connect to Mongodb. Reason",err)
)

//HELPERS AND MIDDLEWARE

//LOGIN api

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 ||req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal Server Error"});
		}
		const user = new userModel({
			username:req.body.username,
			password:hash
		});
		user.save().then(function() {
			return res.status(200).json({"Message":"Register Success"});
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"})
			}
			return res.status(500).json({"Message":"Internal Server Error"});
		});
	})
})

app.use("/api",router);

app.listen(3000);

console.log("Running in port 3000");