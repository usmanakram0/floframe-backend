// import multer from "multer";

// const upload = multer({
//   dest: "uploads/",
//   limits: {
//     fileSize: 200 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     const allowed = ["video/mp4", "video/quicktime"];
//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error("Only MP4 or MOV video files are allowed"));
//     }
//     cb(null, true);
//   },
// });

// export default upload;

import multer from "multer";
import fs from "fs";

const uploadDir = "/tmp/uploads"; // ✅ ONLY writable directory on Vercel

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["video/mp4", "video/quicktime"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only MP4 or MOV video files are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
