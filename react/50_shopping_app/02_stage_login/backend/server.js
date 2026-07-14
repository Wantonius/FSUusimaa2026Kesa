const express = require("express");
const router  = require("./routes/shoppingroute");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const crypto = require("crypto");
const sessionModel = require("./models/session");

const app = express();

app.use(express.json());

//DATABASE CONNECTION

mongoose.connect("mongodb://localhost/shoppingdatabase").then(
	() => console.log("Connected to Mongodb"),
	(err) => console.log("Failed to connect to Mongodb. Reason",err)
)

mongoose.set("toJSON",{virtuals:true});

//HELPERS AND MIDDLEWARE

const ttl_diff = 3600000;

const createToken = () => {
	const token = crypto.randomBytes(64);
	return token.toString("hex");
}

const isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		const now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"});
			}).catch(function(err) {
				console.log("Failed to delete session in isUserLogged. Reason",err);
				return res.status(403).json({"Message":"Forbidden"});
			})
		} else {
			session.ttl = now + ttl_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next()
			}).catch(function(err) {
				console.log("Failed to resave session. Reason",err);
				return next();
			})
		}
	}).catch(function(err) {
		console.log("Error while trying to find session. Reason",err);
		return res.status(403).json({"Message":"Forbidden"});
	})
}

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

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 ||req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal Server Error"})
			}
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"});
			}
			const token = createToken();
			const now = Date.now();
			const session = new sessionModel({
				user:req.body.username,
				token:token,
				ttl:now+ttl_diff
			});
			session.save().then(function() {
				return res.status(200).json({"token":token});
			}).catch(function(err) {
				console.log("Failed to save session. Reason",err);
				return res.status(500).json({"Message":"Internal Server Error"})
			})
		})
	}).catch(function(err) {
		console.log("Error while trying to find user.Reason:",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message":"Not found"});
	}
	sessionModel.deleteOne({"token":req.headers.token}).then(function() {
		return res.status(200).json({"Message":"Logged Out"});
	}).catch(function(err) {
		console.log("Error while logging out. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.use("/api",isUserLogged,router);

app.listen(3000);

console.log("Running in port 3000");