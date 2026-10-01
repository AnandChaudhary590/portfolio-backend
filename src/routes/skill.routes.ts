import { Router } from "express";
import {
  getSkillsController,
  createSkillController,
  updateSkillController,
  deleteSkillController,
} from "../controllers/skill.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getSkillsController);

router.post("/", authenticate, createSkillController);

router.put("/:id", authenticate, updateSkillController);

router.delete("/:id", authenticate, deleteSkillController);

export default router;