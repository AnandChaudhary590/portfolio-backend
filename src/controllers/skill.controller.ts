import { Request, Response } from "express";
import { z } from "zod";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skill.service";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.number().int().min(0).max(100).optional(),
  icon: z.string().optional(),
});

export const getSkillsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const skills = await getSkills();

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};

export const createSkillController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = skillSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const skill = await createSkill(validation.data);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create skill",
    });
  }
};

export const updateSkillController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

if (typeof id !== "string") {
  return res.status(400).json({
    success: false,
    message: "Skill ID is required",
  });
}

    const validation = skillSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const skill = await updateSkill(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update skill",
    });
  }
};

export const deleteSkillController = async (
  req: Request,
  res: Response
) => {
  try {
     const id = req.params.id;

if (typeof id !== "string") {
  return res.status(400).json({
    success: false,
    message: "Skill ID is required",
  });
}

    await deleteSkill(id);

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
};