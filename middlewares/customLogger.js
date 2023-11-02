function customLogger(req, res, next) {
  const start = new Date();
  const method = req.method;
  const url = req.originalUrl;

  res.on('finish', () => {
    const end = new Date();
    const duration = end - start;

    const logMessage = `${method} ${url} ${res.statusCode} - ${duration}ms`;
    console.log(logMessage);
  });

  next();
}
module.exports = customLogger;
