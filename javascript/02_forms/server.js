const express = require("express");

const app = express();

app.use("/",express.static("frontend"));

app.use(express.json());

app.post("/greet",function(req,res) {
	console.log(req);
	const name = req.body.firstname+" "+req.body.lastname;
	return res.status(200).json({"greetings":name})
});

app.listen(3000);

console.log("Running in port 3000");