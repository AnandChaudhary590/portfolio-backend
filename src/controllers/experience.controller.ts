import { Request, Response } from "express";
import { z } from "zod";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experience.service";

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string().optional(),
});

export const getExperiencesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const experiences = await getExperiences();

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Get experiences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
};

export const createExperienceController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = experienceSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const experience = await createExperience(validation.data);

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Create experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create experience",
    });
  }
};

export const updateExperienceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Experience ID is required",
      });
    }

    const validation = experienceSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const experience = await updateExperience(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Update experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

export const deleteExperienceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Experience ID is required",
      });
    }

    await deleteExperience(id);

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};