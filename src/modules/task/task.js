const mongoose = require("mongoose");

const CommonConstants = require("../../constants");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  status: {
    type: String,
    enum: Object.values(CommonConstants.Status),
    default: CommonConstants.Status.TODO,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
