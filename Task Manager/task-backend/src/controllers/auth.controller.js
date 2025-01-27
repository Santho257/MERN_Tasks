import { User } from "../models/user.model.js";
import { generateToken } from "../services/jwt.service.js";
import asyncHandler from "../utils/asynHandler.js";

const signup = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = await generateToken(user);
        res.status(201).send({ token });
    } catch (error) {
        next(error);
    }
});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = await generateToken(user);
        res.status(201).send({ token });
    } catch (error) {
        next(error);
    }
});

export { signup, login };