import jwt from 'jsonwebtoken';
import { jwtSecret } from '../constants.js';

export const generateToken = (payload) => {
    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1d'});
    return token;
}

export const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

export const getIdFromToken = token => {
    if(verifyToken(token))
        return jwt.decode(token).id;  
}