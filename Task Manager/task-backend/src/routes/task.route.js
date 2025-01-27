import { Router } from "express";
import { addTask, deleteTask, getTaskById, updateTask } from "../controllers/task.controller.js";

const TaskRouter = Router();

TaskRouter.route("/:tlid").post(addTask);
TaskRouter.route("/:tlid/:id").get(getTaskById);
TaskRouter.route("/:tlid/:id").patch(updateTask);
TaskRouter.route("/:tlid/:id").delete(deleteTask);

export default TaskRouter;