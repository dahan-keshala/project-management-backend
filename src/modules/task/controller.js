const Database = require("./database");

const addTask = async (req, res) => {
  try {
    const { id, title, description, dueDate, priority } = req.body;

    if (!title || !description)
      return res
        .status(400)
        .send({ error: "Task title and description are required" });

    const newTask = {
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    };

    await Database.create(newTask);

    res
      .status(201)
      .send({ message: "Tasks added successfully", tasks: newTask });
  } catch (error) {
    console.log("Error adding task:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const allTask = await Database.getAll();

    if (allTask && allTask.length === 0)
      return res.status(404).send({ error: "Tasks not found" });

    const filteredTask = allTask.filter((task) => !task.isDelete);

    res
      .status(200)
      .send({ message: "Tasks getted successfully", tasks: filteredTask });
  } catch (error) {
    console.log("Error getting tasks", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Database.findOne(id);

    if (task && task.isDelete)
      return res.status(404).send({ error: "This task has been deleted!" });

    if (!task) return res.status(404).send({ error: "Task not found" });

    res.status(200).send({ message: "Task retrieved successfully", task });
  } catch (error) {
    console.log("Error getting task by ID", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, dueDate, priority, status } = req.body;

    const parameters = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
    };

    const updatedTask = await Database.updateOne(id, parameters);

    if (!updatedTask) return res.status(404).send({ error: "Task not found " });

    res
      .status(200)
      .send({ message: "Task has been updated", data: updatedTask });
  } catch (error) {
    console.log("Error updating task", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Database.deleteOne(id);

    if (!deletedTask) return res.status(404).send({ error: "Task not found" });

    res.status(200).send({ message: "Task deleted", data: deletedTask });
  } catch (error) {
    console.log("Error dalating taks", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  addTask,

  getTasks,

  getTaskById,

  updateTask,

  deleteTask,
};
