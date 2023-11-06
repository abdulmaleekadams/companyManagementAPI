exports.globalErrorHandler = (err, req, res, next) => {
  const { message, stack, status, statusCode } = err;

  res.status(statusCode || 500).json({
    status: status || 'failed',
    message,
    stack,
  });
};

exports.notFound = (req, res, next) => {
  const err = new Error(`Cant find ${req.originalUrl} on the server`);
  next(err);
};
