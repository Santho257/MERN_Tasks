import { verifyToken } from "../services/jwt.service.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw new ApiError(401, "Token not found", { token: "Token not found" });
        else if (verifyToken(authorization)) next();
        else throw new ApiError(401, "Token invalid", { token: "Token Invalid" });
    }
    catch (error) {
        throw error;
    }
});