import { Router } from "express";
import {
  getAboutController,
  updateAboutController,
} from "../controllers/about.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAboutController);
router.put("/", authenticate, updateAboutController);

export default router;