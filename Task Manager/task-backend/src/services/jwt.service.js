import { decode } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../constants.js";

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export const extractToken = (req) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        throw new ApiError(400, { token: "Invalid JWT Token" }, "Invalid Authorization Header");
    }
    return req.headers.authorization.split(' ')[1];
}

export const verifyToken = (req) => {
    const token = extractToken(req);
    try {
        return verify(token, JWT_SECRET);
    } catch (error) {
        throw new ApiError(400, "Invalid Token", { token: "Token is invalid" });
    }
}

export const getIdFromToken = (req) => {
    if(verifyToken(req)){
        return decode(extractToken(req)).id;
    }
}