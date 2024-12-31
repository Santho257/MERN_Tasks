import { User } from "../models/users.model.js";
import { getIdFromToken } from "../services/jwt.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const updateUser = AsyncHandler(async (req, res) => {
    try {
        const id = getIdFromToken(req.headers.authorization);
        await User.findByIdAndUpdate(id, req.body, {runValidators: true});
        res.send(new ApiResponse(200, "Updated Successfully", {...req.body, id}));
    } catch (error) {
        throw error;
    }
})
const deleteUser = AsyncHandler(async (req, res) => {
    try {
        const id = getIdFromToken(req.headers.authorization);
        await User.findByIdAndDelete(id, req.body);
        res.send(new ApiResponse(202, "Deleted Successfully", {id}));
    } catch (error) {
        throw error;
    }
});

export {
    updateUser, deleteUser
}