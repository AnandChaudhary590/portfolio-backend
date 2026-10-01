import { Router } from "express";
import {
  getExperiencesController,
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
} from "../controllers/experience.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getExperiencesController);

router.post("/", authenticate, createExperienceController);

router.put("/:id", authenticate, updateExperienceController);

router.delete("/:id", authenticate, deleteExperienceController);

export default router;