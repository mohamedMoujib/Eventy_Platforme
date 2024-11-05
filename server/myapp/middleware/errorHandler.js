const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error for debugging

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;
