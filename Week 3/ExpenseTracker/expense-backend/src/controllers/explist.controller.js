import { ExpenseList } from "../models/expenseList.model.js";
import { getIdFromToken } from "../services/jwt.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createExpenseList = AsyncHandler(async (req, res) => {
    try {
        const { title } = req.body;
        const createdBy = getIdFromToken(req.headers.authorization);
        const expenseList = await ExpenseList.create({title, createdBy});
        res.status(201).send(new ApiResponse(201, "Expense List created", expenseList));
    } catch (error) {
        throw error;
    }
});

const getExpenseLists = AsyncHandler(async (req, res) => {
    try{
        const createdBy = getIdFromToken(req.headers.authorization);
        const expenseLists = await ExpenseList.find({createdBy});
        res.send(new ApiResponse(200, `Expense List of ${createdBy}`, expenseLists));
    }
    catch(error){
        throw error;
    }
});

const getListById = AsyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const createdBy = getIdFromToken(req.headers.authorization);
        const expenseList = await ExpenseList.findById(id);
        if(!expenseList)
            throw new ApiError(`List with ID ${id} not found`, 404,{id: "Not found"});
        if(expenseList.createdBy != createdBy)
            throw new ApiError(`You are not allowed to deleted the list`, 403, {token: "Access Denied"})
        res.send(new ApiResponse(200, `Expense List of ${id}`, expenseList));
    }
    catch(error){
        throw error;
    }
})

const updateList = AsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const foundList = await ExpenseList.findById(id);
        if(!foundList)
            throw new ApiError(`List with ID ${id} not found`,404, {id: "Not found"});
        if(foundList.createdBy != loggedInUser)
            throw new ApiError(`You are not allowed to deleted the list`, 403, "Access denied")
        const updatedList = await ExpenseList.findByIdAndUpdate(id, req.body, {runValidators:true});
        res.status(202).send(new ApiResponse(202, "List Updated", updatedList));
    } catch (error) {
        throw error;
    }
})

const deleteList = AsyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const loggedInUser = getIdFromToken(req.headers.authorization);
        const foundList = await ExpenseList.findById(id);
        if(!foundList)
            throw new ApiError(`List with ID ${id} not found`, 404, {id: "Not found"});
        if(foundList.createdBy != loggedInUser)
            throw new ApiError(`You are not allowed to deleted the list`, 403,"Access denied")
        const deleteList = await ExpenseList.findByIdAndDelete(id);
        res.status(202).send(new ApiResponse(202, "List Deleted", deleteList));
    } catch (error) {
        throw error;
    }   
})

export {
    createExpenseList, getExpenseLists, updateList, deleteList, getListById
}