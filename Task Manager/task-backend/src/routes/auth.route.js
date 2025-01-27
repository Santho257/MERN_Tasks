import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.route("/signup").post(signup);
AuthRouter.route("/login").post(login);

export default AuthRouter;