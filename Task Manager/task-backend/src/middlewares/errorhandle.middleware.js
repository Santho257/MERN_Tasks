import { MongooseError } from "mongoose";
import ApiError from "../utils/ApiError.js";

const errorHandler = (error, req, res, next) => {
    if(error.name == "ValidationError"){
        const errors = {};
        for(let err in error.errors){
            errors[err] = error.errors[err].message;
        }
        res.status(400).send(new ApiError(400, error.name, errors, error.stackTraceLimit));
        return;
    }
    else if(error instanceof ApiError){
        res.status(error.status).send(error);
        return;
    }
    else if(error instanceof MongooseError && error.kind == "ObjectId"){
        res.status(400).send(new ApiError(400, error.message, {id: `${error.value} is not ObjectID`}, error.stackTraceLimit));
        return;
    }
    else if(error.code == 11000){
        const errors = {};
        for(let err in error.keyValue){
            errors[err] = `${error.keyValue[err]} already exists!`;
        }
        res.status(400).send(new ApiError(400, error.message, errors, error.stackTraceLimit));
        return;
    }
    else
        res.status(500).send(new ApiError(500, error.message ?? "Unknown Error", error.message, error.stackTraceLimit))
}

export default errorHandler;