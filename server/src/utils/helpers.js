// Utility helpers for CarSaga server

exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.formatResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data,
});
