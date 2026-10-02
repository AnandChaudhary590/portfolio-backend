import { Request, Response } from "express";
import { createMedia } from "../services/media.service";

export const uploadImageController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;

    const media = await createMedia({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: media,
    });
  } catch (error) {
    console.error("Upload image error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload image",
    });
  }
};