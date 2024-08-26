const express = require("express");

const router = require("./router");

const bodyPasrser = require("body-parser");

const { Database } = require("../config");

const app = express();

Database.connectDB();

app.use(bodyPasrser.json());

app.use("/", router);

module.exports = app;
