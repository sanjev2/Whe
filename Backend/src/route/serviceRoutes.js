// routes/serviceRoutes.js
import express from "express";
import { serviceController } from "../controller/serviceController.js";

const router = express.Router();

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/", serviceController.create);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

export { router as serviceRouter };
