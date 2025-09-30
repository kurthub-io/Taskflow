const express = require("express");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

// GET all tasks
router.get("/", getAllTasks);

// GET Single Task
router.get("/:id", getSingleTask);

// POST task
router.post("/", createTask);

// DELETE task
router.delete("/:id", deleteTask);

// Update task
router.patch("/:id", updateTask);

module.exports = router;
