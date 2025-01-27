import { verifyToken } from "../services/jwt.service.js";

export const requireAuth = (req, res, next) => {
    try{
        if(verifyToken(req)){
            next();
        }
        else{
            next(new ApiError(401, "Unauthorized", { token: "Invalid token" }));
        }
    }
    catch(error){
        next(error);
    }
};