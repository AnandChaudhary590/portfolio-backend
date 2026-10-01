import { Router } from "express";
import {
  getBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} from "../controllers/blog.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getBlogsController);

router.post("/", authenticate, createBlogController);

router.put("/:id", authenticate, updateBlogController);

router.delete("/:id", authenticate, deleteBlogController);

export default router;