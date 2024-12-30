import { Router } from "express";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expense.controller.js";

const ExpenseRouter = Router();
ExpenseRouter.route("").post(addExpense);
ExpenseRouter.route("/:id").patch(updateExpense);
ExpenseRouter.route("/:id").delete(deleteExpense);
ExpenseRouter.route("/explists/:expenseList").get(getExpenses);

export default ExpenseRouter;