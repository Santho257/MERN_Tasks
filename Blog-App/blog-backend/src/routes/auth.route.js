import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.route("/signup").post(signUp);
AuthRouter.route("/login").post(login);

export default AuthRouter;