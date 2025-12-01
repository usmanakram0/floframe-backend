import { extractLastFrame } from "../utils/ffmpeg.js";
import { deleteFile } from "../utils/cleanTemp.js";
import path from "path";
import fs from "fs";

export const extractFrameController = async (req, res, next) => {
  const videoFile = req.file;

  console.log("final deployments");

  if (!videoFile) {
    return next(new Error("No video file uploaded"));
  }

  try {
    const framesDir = "/tmp/frames"; // ✅ Vercel safe

    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    const framePath = path.join(framesDir, `${Date.now()}-last.png`);

    await extractLastFrame(videoFile.path, framePath);

    res.download(framePath, "last_frame.png", () => {
      deleteFile(videoFile.path);
      deleteFile(framePath);
    });
  } catch (err) {
    deleteFile(videoFile?.path);
    next(err);
  }
};
