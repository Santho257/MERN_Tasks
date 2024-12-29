import { User } from "../models/user.model.js";
import { generateToken } from "../services/jwt.services.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const signUp = AsyncHandler(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = generateToken({id: newUser._id});
        res.status(201).send(new ApiResponse(201, "User Created", {token}));
    } catch (error) {
        throw error;
    }
});

const login = AsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = generateToken({id: user._id});
        res.status(200).send(new ApiResponse(201, "Logged In successfully", {token}));
    }
    catch(error){
        throw error;
    }
})


export {
    signUp, login
}