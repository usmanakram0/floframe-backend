// import ffmpeg from "fluent-ffmpeg";

// export const extractLastFrame = (videoPath, outputPath) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoPath)
//       .inputOptions(["-sseof -0.1"])
//       .frames(1)
//       .output(outputPath)
//       .on("start", (cmd) => console.log("FFmpeg command:", cmd))
//       .on("end", () => resolve(true))
//       .on("error", (err) => reject(err))
//       .run();
//   });
// };

import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * @param {string} videoPath - path to video file
 * @param {string} outputPath - path to save extracted frame
 * @param {number} timeout - optional timeout in ms
 */
export const extractLastFrame = (videoPath, outputPath, timeout = 15000) => {
  return new Promise((resolve, reject) => {
    let finished = false;

    const ffmpegProcess = ffmpeg(videoPath)
      .inputOptions(["-sseof", "-0.5"])
      .frames(1)
      .output(outputPath)
      .on("start", (cmd) => console.log("FFmpeg command:", cmd))
      .on("stderr", (line) => console.log("FFmpeg stderr:", line))
      .on("end", () => {
        if (!finished) {
          finished = true;
          clearTimeout(timer);
          resolve(true);
        }
      })
      .on("error", (err) => {
        if (!finished) {
          finished = true;
          clearTimeout(timer);
          reject(err);
        }
      })
      .run();

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        ffmpegProcess.kill("SIGKILL");
        reject(new Error("FFmpeg extraction timed out"));
      }
    }, timeout);
  });
};
