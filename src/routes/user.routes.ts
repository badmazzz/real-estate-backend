import { Router } from "express";
import UserController from "../controllers/user.controllers";
import authMiddleware from "../middlewares/auth.middlewares";

const router = Router();

router.post("/users", UserController.createUser);
router.post("/users/login", UserController.loginUser);
router.get("/users", authMiddleware, UserController.getUsers); // Protected route

export default router;
