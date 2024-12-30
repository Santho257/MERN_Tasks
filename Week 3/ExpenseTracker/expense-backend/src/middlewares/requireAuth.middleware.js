import { verifyToken } from "../services/jwt.service.js";
import ApiError from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const requireAuth = AsyncHandler(async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token)  throw new ApiError("Token not available", 401, {token: "Token Invalid"});
        else if(verifyToken(token))  next();
        else    throw new ApiError("Token invalid", 401, {token: "Token Invalid"});
    }
    catch(error){
        throw error;
    }
});