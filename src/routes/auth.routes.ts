import { Router } from "express";
import { login, refresh } from "../controllers/auth.controller";
import {
  authenticate,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "Auth route is working",
  });
});

router.post("/login", login);
router.post("/refresh", refresh);

router.get("/protected", authenticate, (req: AuthRequest, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

export default router;