const {Router} = require("express");
const { welcome, welcomeByParams } = require("../controllers/welcome.controller");

const WelcomeRouter = Router();

WelcomeRouter.get("/", welcome);
WelcomeRouter.get("/:viewer", welcomeByParams);

module.exports = WelcomeRouter;