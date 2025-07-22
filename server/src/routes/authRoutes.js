import { Router } from "express";
import { register, login, getUserInfo, updateUserInfo} from "../controllers/authController.js";
import { varefyToken } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user-info",varefyToken ,getUserInfo);
authRouter.post("/update-profile",varefyToken ,updateUserInfo);
export default authRouter;