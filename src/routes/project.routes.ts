import { Router } from "express";
import {
  getProjectsController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/project.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProjectsController);

router.post("/", authenticate, createProjectController);

router.put("/:id", authenticate, updateProjectController);

router.delete("/:id", authenticate, deleteProjectController);

export default router;