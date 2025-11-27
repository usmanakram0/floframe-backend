// import { extractLastFrame } from "../utils/ffmpeg.js";
// import { deleteFile } from "../utils/cleanTemp.js";
// import path from "path";
// import fs from "fs";

// export const extractFrameController = async (req, res, next) => {
//   const videoFile = req.file;

//   if (!videoFile) {
//     return next(new Error("No video file uploaded"));
//   }

//   try {
//     const framesDir = "/tmp/frames";
//     if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

//     const framePath = path.join(framesDir, `${Date.now()}-last.png`);

//     await extractLastFrame(videoFile.path, framePath);

//     res.download(framePath, "last_frame.png", () => {
//       deleteFile(videoFile.path);
//       deleteFile(framePath);
//     });

//   } catch (err) {
//     deleteFile(videoFile?.path);
//     next(err);
//   }
// };

import { extractLastFrame } from "../utils/ffmpeg.js";
import path from "path";
import fs from "fs";

export const extractFrameController = async (req, res, next) => {
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).json({ error: "No video file uploaded" });
  }

  try {
    // ✅ Save uploaded buffer to /tmp (ONLY writable directory on Vercel)
    const inputPath = path.join("/tmp", `input-${Date.now()}.mp4`);
    fs.writeFileSync(inputPath, videoFile.buffer);

    // ✅ Frames dir in /tmp
    const framesDir = "/tmp/frames";
    if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

    const framePath = path.join(framesDir, `${Date.now()}-last.png`);

    // ✅ Extract last frame using ffmpeg
    await extractLastFrame(inputPath, framePath);

    const imageBuffer = fs.readFileSync(framePath);

    // ✅ Send as image (NOT res.download on serverless)
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);

    // ✅ Cleanup
    fs.unlinkSync(inputPath);
    fs.unlinkSync(framePath);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
