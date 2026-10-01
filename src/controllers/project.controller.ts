import { Request, Response } from "express";
import { z } from "zod";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  image: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  technologies: z
    .array(z.string().min(1))
    .min(1, "At least one technology is required"),
  featured: z.boolean().optional(),
});

export const getProjectsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const projects = await getProjects();

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const createProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = projectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const project = await createProject(validation.data);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const updateProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const validation = projectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const project = await updateProject(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

export const deleteProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    await deleteProject(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};