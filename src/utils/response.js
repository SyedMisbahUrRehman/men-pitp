/**
 * Consistent success and error response structure for the entire app.
 * All API responses use these helpers for a uniform shape.
 */

/**
 * Success response structure
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default 200)
 * @param {string} message - Human-readable success message
 * @param {*} data - Optional payload (object, array, etc.)
 */
const success = (res, statusCode = 200, message, data = null) => {
  const payload = {
    success: true,
    message: message || 'Operation completed successfully',
  };
  if (data !== null && data !== undefined) {
    payload.data = data;
  }
  return res.status(statusCode).json(payload);
};

/**
 * Error response structure
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {string} message - Human-readable error message
 * @param {*} errors - Optional validation/details (object, array, or string)
 */
const error = (res, statusCode = 500, message = 'Something went wrong', errors = null) => {
  const payload = {
    success: false,
    message,
  };
  if (errors !== null && errors !== undefined) {
    payload.errors = errors;
  }
  return res.status(statusCode).json(payload);
};

module.exports = { success, error };
