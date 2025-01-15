import { MongooseError } from "mongoose";
import ApiError from "./ApiError.js"

export const asyncHandler = func => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch(error => {
            if(error.name == "ValidationError"){
                const errors = {};
                for(let err in error.errors){
                    errors[err] = error.errors[err].message;
                }
                res.status(400).send(new ApiError(400, error.name, errors, error.stackTraceLimit));
                return;
            }
            if(error instanceof ApiError){
                res.status(error.status).send(error);
            }
            if(error instanceof MongooseError && error.kind == "ObjectId"){
                res.status(400).send(new ApiError(400, error.message, {id: `${error.value} is not ObjectID`}, error.stackTraceLimit));
                return;
            }
            if(error.code == 11000){
                const errors = {};
                for(let err in error.keyValue){
                    errors[err] = `${error.keyValue[err]} already exists!`;
                }
                res.status(400).send(new ApiError(400, error.message, errors, error.stackTraceLimit));
                return;
            }
            res.status(500).send(new ApiError(500, error.message ?? "Unknown Error", error, error.stackTraceLimit))
        })
}