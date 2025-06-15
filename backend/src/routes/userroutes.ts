import { Router } from "express";
import { registerUser, loginUser, dobUser } from "../controllers/user";

const router = Router();

router.post("/register", registerUser as any);
router.post("/login", loginUser as any);
router.post("/dob", dobUser as any);

export default router;