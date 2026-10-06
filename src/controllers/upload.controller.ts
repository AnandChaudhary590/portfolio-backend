import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
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

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary upload failed"));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(req.file!.buffer);
    });

    const media = await createMedia({
      filename: uploadResult.public_id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: uploadResult.secure_url,
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