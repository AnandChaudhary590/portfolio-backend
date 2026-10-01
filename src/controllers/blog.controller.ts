import { Request, Response } from "express";
import { z } from "zod";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blog.service";

const blogSchema = z.object({
  title: z.string().min(1, "Blog title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Blog content is required"),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
});

export const getBlogsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const blogs = await getBlogs();

    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Get blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

export const createBlogController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = blogSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const blog = await createBlog(validation.data);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

export const updateBlogController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const validation = blogSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const blog = await updateBlog(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

export const deleteBlogController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    await deleteBlog(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};