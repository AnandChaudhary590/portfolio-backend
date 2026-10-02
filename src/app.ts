import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import aboutRoutes from "./routes/about.routes";
import skillRoutes from "./routes/skill.routes";
import projectRoutes from "./routes/project.routes";
import blogRoutes from "./routes/blog.routes";
import experienceRoutes from "./routes/experience.routes";
import testimonialRoutes from "./routes/testimonial.routes";
import serviceRoutes from "./routes/service.routes";
import uploadRoutes from "./routes/upload.routes";
import mediaRoutes from "./routes/media.routes";

import path from "path";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/media", mediaRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio CMS API is running",
  });
});

export default app;