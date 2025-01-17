import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constants.js"
import ApiError from "../utils/ApiError.js";

const { decode, sign, verify } = jwt;

export const generateToken = (payload) => {
    return sign(payload, JWT_SECRET, { expiresIn: "10h" });
}

const extractToken = authorization => {
    if(authorization.startsWith("Bearer "))
        return authorization.slice(7);
    throw new ApiError(400, "No Bearer token", {token: "Invalid Authorization header"});
}

export const verifyToken = authorization => {
    const token = extractToken(authorization);
    try {
        return verify(token, JWT_SECRET);
    } catch (error) {
        throw new ApiError(400, "Invalid Token", { token: "Token is invalid" });
    }
}

export const getIdFromToken = authorization => {
    const token = extractToken(authorization)
    if(verifyToken(authorization))
        return decode(token).id;
}