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

// ✅ Vercel-compatible: stores file in RAM instead of disk
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
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
