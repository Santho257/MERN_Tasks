import { Router } from "express";
import { createExpenseList, deleteList, getExpenseLists, getListById, updateList } from "../controllers/explist.controller.js";

const ExpListRouter = Router();

ExpListRouter.route("").post(createExpenseList);
ExpListRouter.route("").get(getExpenseLists);
ExpListRouter.route("/:id").get(getListById);
ExpListRouter.route("/:id").patch(updateList);
ExpListRouter.route("/:id").delete(deleteList);

export default ExpListRouter;