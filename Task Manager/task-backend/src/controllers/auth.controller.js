import { User } from "../models/user.model.js";
import { generateToken } from "../services/jwt.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynHandler.js";

const signup = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = await generateToken(user);
        res.status(201).send(new ApiResponse(201, { token }, "User created successfully"));
    } catch (error) {
        next(error);
    }
});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = await generateToken(user);
        res.status(201).send(new ApiResponse(200, { token }, "User logged in successfully"));
    } catch (error) {
        next(error);
    }
});

export { signup, login };