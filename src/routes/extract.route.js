import express from "express";
import upload from "../middleware/fileUpload.js";
import { extractFrameController } from "../controllers/extract.controller.js";

const router = express.Router();

router.post(
  "/extract-last-frame",
  upload.single("video"),
  extractFrameController
);

export default router;
