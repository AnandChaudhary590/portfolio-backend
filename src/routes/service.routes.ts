import { Router } from "express";
import {
  getServicesController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from "../controllers/service.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getServicesController);

router.post("/", authenticate, createServiceController);

router.put("/:id", authenticate, updateServiceController);

router.delete("/:id", authenticate, deleteServiceController);

export default router;