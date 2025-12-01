import express from "express";
import upload from "../middleware/upload.js";
import { extractFrameController } from "../controllers/extract.controller.js"; // ✅ use the controller
import cors from "cors";

const router = express.Router();

router.post(
  "/extract-last-frame",
  cors({ origin: "http://localhost:3000" }),
  upload.single("video"),
  extractFrameController // ✅ pass Express handler
);

export default router;
