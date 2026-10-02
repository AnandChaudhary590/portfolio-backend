import { Router } from "express";
import { getMediaController } from "../controllers/media.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, getMediaController);

export default router;