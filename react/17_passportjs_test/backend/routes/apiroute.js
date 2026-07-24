const express = require("express");

const router = express.Router();

router.get("/greeting",function(req,res) {
	return res.status(200).json({"message":"Hello "+req.session.passport.user.user});
})

module.exports = router;