const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(400).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
