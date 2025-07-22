import { Router } from "express";
import { register, login, getUserInfo, updateUserInfo, uploadProfileImage, removeProfileImage } from "../controllers/authController.js";
import { varefyToken } from "../middlewares/authMiddleware.js";

import multer from "multer";

const storage = multer({ dest: "uploads/profiles" })

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user-info", varefyToken, getUserInfo);
authRouter.post("/update-profile", varefyToken, updateUserInfo);
authRouter.post("/upload-image", varefyToken, storage.single("profile-image"), uploadProfileImage);
authRouter.delete("/remove-image", varefyToken, removeProfileImage);

export default authRouter;