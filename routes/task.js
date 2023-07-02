import {
  deleteTask,
  getmytask,
  newtask,
  updateTask,
} from "../controllers/task.js";
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/newtask", isAuthenticated, newtask);
router.get("/my", isAuthenticated, getmytask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
