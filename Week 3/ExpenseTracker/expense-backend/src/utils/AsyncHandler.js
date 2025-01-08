import { MongooseError } from "mongoose";
import ApiError from "./ApiError.js";

export const AsyncHandler = func => (req, res, next) =>{
    return Promise.resolve(func(req, res, next))
        .catch(error => {
            if(error.name == "ValidationError"){
                const errors = {};
                for(let err in error.errors){
                    errors[err] = error.errors[err].message;
                }
                res.status(400).send(new ApiError(error.name, 400, errors, error.stackTraceLimit));
                return;
            }
    
            if (error instanceof ApiError){
                res.status(error.status).send(error);
                return;
            }
            if(error instanceof MongooseError && error.kind == "ObjectId"){
                res.status(400).send(new ApiError(error.message, 400, {id: `${error.value} is not ObjectID`}, error.stackTraceLimit));
                return;
            }
            if(error.code == 11000){
                const errors = {};
                for(let err in error.keyValue){
                    errors[err] = `${error.keyValue[err]} already exists!`;
                }
                res.status(400).send(new ApiError(error.message, 400, errors, error.stackTraceLimit));
                return;
            }
            res.status(500).send(new ApiError(error.message || "Unknown Error", 500, error, error.stackTrace));
        })
}