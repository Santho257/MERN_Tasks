import jwt from 'jsonwebtoken';
import { jwtSecret } from '../constants.js';
import ApiError from '../utils/ApiError.js';

export const generateToken = (payload) => {
    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1d'});
    return token;
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new ApiError(error.message, 400, {token: "Invalid Token"})
    }
}

export const getIdFromToken = token => {
    if(verifyToken(token))
        return jwt.decode(token).id;  
}