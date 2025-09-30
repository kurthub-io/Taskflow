const Task = require("../model/taskSchema");
const mongoose = require("mongoose");

// get all tasks
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

// get single task
const getSingleTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No tasks available" });
  }

  const tasks = await Task.findById(id);

  if (!tasks) {
    return res.status(404).json({ error: "No tasks available" });
  }

  res.status(200).json(tasks);
};

// new task
const createTask = async (req, res) => {
  const { title, description, date, category, time } = req.body;

  // add to db
  try {
    const task = await Task.create({
      title,
      description,
      date,
      category,
      time,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ mssg: "POST new task" });
};

// delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "ID is not valid" });
  }

  res.status(200).json(task);
};

// update task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  const task = await Task.findOneAndUpdate({ _id: id }, {
    ...req.body
  });

  if (!task) {
    return res.status(400).json({ error: "ID is not valid" });
  }

  res.status(200).json(task);
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
};
