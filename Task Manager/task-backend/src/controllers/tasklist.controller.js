import { TaskList } from "../models/tasklist.model.js";
import { getIdFromToken } from "../services/jwt.service.js";
import asyncHandler from "../utils/asynHandler.js";

const addTaskList = asyncHandler(async (req, res, next) => {
    try{
        const taskList = await TaskList.create({ ...req.body, createdBy: getIdFromToken(req) });
        res.status(201).send(new ApiResponse(201, taskList, "TaskList created successfully"));
    }
    catch (error){
        next(error);
    }
});

const getTaskLists = asyncHandler(async (req, res, next) => {
    try{
        const taskLists = await TaskList.find({ createdBy: getIdFromToken(req) });
        res.status(200).send(new ApiResponse(200, taskLists, "TaskLists fetched successfully"));
    }
    catch (error){
        next(error);
    }
});

const getTaskListById = asyncHandler(async (req, res, next) => {
    try{
        const taskList = await TaskList.findOne({ _id: req.params.id, createdBy: getIdFromToken(req) }).populate("tasks");
        if (!taskList){
            return next(new ApiError(404, "TaskList not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, taskList, "TaskList fetched successfully"));
    }
    catch (error){
        next(error);
    }
});

const updateTaskList = asyncHandler(async (req, res, next) => {
    try{
        const taskList = await TaskList.findOneAndUpdate({ _id: req.params.id, createdBy: getIdFromToken(req) }, req.body, { new: true });
        if (!taskList){
            return next(new ApiError(404, "TaskList not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, taskList, "TaskList updated successfully"));
    }
    catch (error){
        next(error);
    }
});

const deleteTaskList = asyncHandler(async (req, res, next) => {
    try{
        const taskList = await TaskList.findOneAndDelete({ _id: req.params.id, createdBy: getIdFromToken(req) });
        if (!taskList){
            return next(new ApiError(404, "TaskList not found", { id: `${req.params.id} not found` }));
        }
        res.status(200).send(new ApiResponse(200, taskList, "TaskList deleted successfully"));
    }
    catch (error){
        next(error);
    }
});

export { addTaskList, getTaskLists, getTaskListById, updateTaskList, deleteTaskList };