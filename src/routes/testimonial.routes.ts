import { Router } from "express";
import {
  getTestimonialsController,
  createTestimonialController,
  updateTestimonialController,
  deleteTestimonialController,
} from "../controllers/testimonial.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getTestimonialsController);

router.post("/", authenticate, createTestimonialController);

router.put("/:id", authenticate, updateTestimonialController);

router.delete("/:id", authenticate, deleteTestimonialController);

export default router;