import { Request, Response } from "express";
import { z } from "zod";
import {
  getAbout,
  updateAbout,
} from "../services/about.service";

const aboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  profileImage: z.string().nullable().optional(),
resumeUrl: z.string().nullable().optional(),
});

export const getAboutController = async (
  _req: Request,
  res: Response
) => {
  try {
    const about = await getAbout();

    return res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error("Get about error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch about information",
    });
  }
};

export const updateAboutController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = aboutSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const about = await updateAbout(validation.data);

    return res.status(200).json({
      success: true,
      message: "About information updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Update about error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update about information",
    });
  }
};