import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newtask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getmytask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
