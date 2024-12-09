const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 if not already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Respond with structured error
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "SERVER_ERROR", // Optional error code for frontend handling
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack trace in production
  });
};

export default errorHandler;
