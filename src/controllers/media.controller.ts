import { Request, Response } from "express";
import { getMedia } from "../services/media.service";

export const getMediaController = async (
  _req: Request,
  res: Response
) => {
  try {
    const media = await getMedia();

    return res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Get media error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch media",
    });
  }
};