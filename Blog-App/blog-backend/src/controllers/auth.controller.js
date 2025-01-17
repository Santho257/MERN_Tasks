import User from "../models/users.model.js";
import { generateToken } from "../services/jwt.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const signUp = asyncHandler(async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = generateToken({ id: newUser.id, sub: newUser.name });
        res.status(201).send(new ApiResponse(201, "User Created Successfully", { token }));
    }
    catch (error) {
        throw error;
    }
});

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = generateToken({ id: user.id, sub: user.name });
        res.status(200).send(new ApiResponse(200, "User logged in Successfully", { token }));
    }
    catch (error) {
        throw error;
    }
});

export { signUp, login };