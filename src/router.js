const express = require("express");

const { TaskRouter } = require("./modules/task");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Awesome :-), Project Management Backend service working properly");
});

router.use("/tasks", TaskRouter);

module.exports = router;
