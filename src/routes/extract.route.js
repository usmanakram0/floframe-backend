import express from "express";
import upload from "../middleware/upload.js";
import { extractLastFrame } from "../controllers/extract.controller.js";
import cors from "cors";

const router = express.Router();

// Enable CORS specifically for this route
router.post(
  "/extract-last-frame",
  cors({ origin: "http://localhost:3000" }),
  upload.single("video"),
  extractLastFrame
);

export default router;
