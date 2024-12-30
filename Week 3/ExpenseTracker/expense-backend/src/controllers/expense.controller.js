import { ExpenseList } from "../models/expenseList.model.js";
import { Expense } from "../models/expenses.model.js";
import { getIdFromToken } from "../services/jwt.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const addExpense = AsyncHandler(async (req, res, next) => {
    try {
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const list = await ExpenseList.findById(req.body.expenseList).populate('createdBy');
        if (list?.createdBy && loggedInUser != list?.createdBy?._id) {
            throw new ApiError("You are not authorized to add expense to this list", 403, { token: "Not authorized" });
        }
        const expense = await Expense.create(req.body);
        res.status(201).send(new ApiResponse(201, "Expense Added", expense));
    }
    catch (error) {
        throw error;
    }
});

const getExpenses = AsyncHandler(async (req, res, next) => {
    try {
        const { expenseList } = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const list = await ExpenseList.findById(expenseList);
        if (list?.createdBy && loggedInUser != list?.createdBy) {
            throw new ApiError("You are not authorized to view expenses fo this list", 403, { token: "Not authorized" });
        }
        const expenses = await Expense.find({ expenseList });
        res.status(200).send(new ApiResponse(200, "Expenses", expenses));
    }
    catch (error) {
        throw error;
    }
});

const updateExpense = AsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const expense = await Expense.findById(id).populate('expenseList');
        if(!expense)    throw new ApiError(`Expense Not found for ID :: ${id}`, 404, {id: "Not found"});
        if(expense.expenseList.createdBy != loggedInUser)
            throw new ApiError("You are not authorized to edit this expense", 403, { token: "Not authorized" });
        await Expense.findByIdAndUpdate(id, req.body);
        res.status(202).send(new ApiResponse(202, "Updated successfully", {message: `Updated ${id}`}));
    } catch (error) {
        throw error;
    }
});

const deleteExpense = AsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const expense = await Expense.findById(id).populate('expenseList');
        if(!expense)    throw new ApiError(`Expense Not found for ID :: ${id}`, 404, {id: "Not found"});
        if(expense.expenseList.createdBy != loggedInUser)
            throw new ApiError("You are not authorized to edit this expense", 403, { token: "Not authorized" });
        await Expense.findByIdAndDelete(id);
        res.status(202).send(new ApiResponse(202, "Deleted successfully", {message: `Deleted ${id}`}));
    } catch (error) {
        throw error;
    }
});

export { addExpense, getExpenses, updateExpense, deleteExpense }

