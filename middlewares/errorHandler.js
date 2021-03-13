import ErrorResponse from '../utils/ErrorResponse.js';

const errorHandler = (err, req, res, next) => {
   let error;

   if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      const value = Object.values(err.keyValue)[0];
      const message = `The ${key} '${value}' already exists.`;
      error = new ErrorResponse(message, 400);
   }

   if (err.name === 'ValidationError') {
      const message = Object.values(err.errors);
      error = new ErrorResponse(message, 400);
   }

   let jsonResponse = {
      success: false,
      error: error?.message || err?.message || 'Unknown server error',
   };

   if (!error && !(err instanceof ErrorResponse)) jsonResponse.details = err;

   res.status(error?.statusCode || err?.statusCode || 500).json(jsonResponse);
};

export default errorHandler;
