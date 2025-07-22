import { Router } from "express";
import { register, login, getUserInfo} from "../controllers/authController.js";
import { varefyToken } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/userInfo",varefyToken ,getUserInfo);

export default authRouter;