import { Router } from "express";
import { addTask, deleteTask, getTaskById, updateTask } from "../controllers/task.controller.js";

const TaskRouter = Router();

TaskRouter.route("/").post(addTask);
TaskRouter.route("/:id").get(getTaskById);
TaskRouter.route("/:id").patch(updateTask);
TaskRouter.route("/:id").delete(deleteTask);

export default TaskRouter;