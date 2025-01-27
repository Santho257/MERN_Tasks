import { Task } from "../models/tasks.model.js";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asynHandler.js";

const addTask = asyncHandler(async (req, res, next) => {
    try{
        const task = await Task.create({ ...req.body, belongsTo: req.params.tlid });
        res.status(201).send(new ApiResponse(201, task, "Task created successfully"));
    }
    catch (error){
        next(error);
    }
});

const getTaskById = asyncHandler(async (req, res, next) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, belongsTo: req.params.tlid });
        if (!task){
            return next(new ApiError(404, "Task not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, task, "Task fetched successfully"));
    }
    catch (error){
        next(error);
    }
});

const updateTask = asyncHandler(async (req, res, next) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        if (!task){
            return next(new ApiError(404, "Task not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, task, "Task updated successfully"));
    }
    catch (error){
        next(error);
    }
});

const deleteTask = asyncHandler(async (req, res, next) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task){
            return next(new ApiError(404, "Task not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, task, "Task deleted successfully"));
    }
    catch (error){
        next(error);
    }
});

export { addTask, getTaskById, updateTask, deleteTask };