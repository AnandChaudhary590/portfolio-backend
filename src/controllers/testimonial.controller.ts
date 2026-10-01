import { Request, Response } from "express";
import { z } from "zod";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../services/testimonial.service";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  image: z.string().optional(),
});

export const getTestimonialsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const testimonials = await getTestimonials();

    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Get testimonials error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

export const createTestimonialController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = testimonialSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const testimonial = await createTestimonial(validation.data);

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Create testimonial error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
    });
  }
};

export const updateTestimonialController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Testimonial ID is required",
      });
    }

    const validation = testimonialSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const testimonial = await updateTestimonial(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
    });
  }
};

export const deleteTestimonialController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Testimonial ID is required",
      });
    }

    await deleteTestimonial(id);

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};