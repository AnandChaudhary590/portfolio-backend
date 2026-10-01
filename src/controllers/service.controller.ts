import { Request, Response } from "express";
import { z } from "zod";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/service.service";

const serviceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  description: z.string().min(1, "Service description is required"),
  icon: z.string().optional(),
});

export const getServicesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const services = await getServices();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

export const createServiceController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = serviceSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const service = await createService(validation.data);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};

export const updateServiceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const validation = serviceSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const service = await updateService(id, validation.data);

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

export const deleteServiceController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    await deleteService(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};