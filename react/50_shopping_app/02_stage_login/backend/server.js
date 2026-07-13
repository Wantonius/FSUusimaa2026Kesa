const express = require("express");
const router  = require("./routes/shoppingroute");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.use("/api",router);

app.listen(3000);

console.log("Running in port 3000");