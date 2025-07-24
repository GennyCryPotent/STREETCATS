//this middleware handles errors in the application
export function errorHandler(err, req, res, next) {
    console.error(err);

    const status = err.status || 500; // Default to 500 if no status is set
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ error: message });
}