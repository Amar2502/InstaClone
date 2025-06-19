import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user";
import { isauth } from "../controllers/auth";
import isAuthenticated from "../middlewares/authenticated";

const router = Router();

router.post("/register", registerUser as any);
router.post("/login", loginUser as any);
router.post("/isauth", isAuthenticated, isauth as any);

export default router;