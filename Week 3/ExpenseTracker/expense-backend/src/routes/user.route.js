import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const UserRoute = Router();
UserRoute.route("").patch(updateUser);
UserRoute.route("").delete(deleteUser);
export default UserRoute;