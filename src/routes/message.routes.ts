import { Router } from "express";
import {
  getMessagesController,
  createMessageController,
  markMessageAsReadController,
  deleteMessageController,
} from "../controllers/message.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public contact form
router.post("/", createMessageController);

// Admin protected routes
router.get("/", authenticate, getMessagesController);

router.patch(
  "/:id/read",
  authenticate,
  markMessageAsReadController
);

router.delete(
  "/:id",
  authenticate,
  deleteMessageController
);

export default router;