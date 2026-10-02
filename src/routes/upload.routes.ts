import { Router } from "express";
import { uploadImageController } from "../controllers/upload.controller";
import { uploadImage } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/image",
  authenticate,
  uploadImage,
  uploadImageController
);

export default router;