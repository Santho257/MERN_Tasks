import { Router } from "express";
import { addTaskList, deleteTaskList, getTaskListById, getTaskLists, updateTaskList } from "../controllers/tasklist.controller.js";
const TaskListRouter = Router();

TaskListRouter.route("/").get(getTaskLists);
TaskListRouter.route("/").post(addTaskList);
TaskListRouter.route("/:id").get(getTaskListById);
TaskListRouter.route("/:id").patch(updateTaskList);
TaskListRouter.route("/:id").delete(deleteTaskList);

export default TaskListRouter;