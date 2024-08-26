const express = require("express");

const controller = require("./controller");

const router = express.Router();

router.route("/").post(controller.addTask);

router.route("/").get(controller.getTasks);

router.route("/:id").get(controller.getTaskById);

router.route("/:id").put(controller.updateTask);

router.route("/:id").delete(controller.deleteTask);

module.exports = router;
