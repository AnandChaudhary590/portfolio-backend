import { Request, Response } from "express";
import { z } from "zod";
import {
  loginAdmin,
  refreshAccessToken,
} from "../services/auth.service";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const login = async (req: Request, res: Response) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const result = await loginAdmin(validation.data);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed";

    if (message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    if (message === "Access denied") {
      return res.status(403).json({
        success: false,
        message,
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const result = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Token refresh failed";

    if (
      message === "Invalid refresh token" ||
      message === "Refresh token expired"
    ) {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    if (message === "Access denied") {
      return res.status(403).json({
        success: false,
        message,
      });
    }

    console.error("Refresh token error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};