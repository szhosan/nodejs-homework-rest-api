const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

// 409 status code = request could not be processed because of conflict in the request
// 400 status code = Bad Request -  the server cannot or will not process the request due to something that is perceived to be a client error

module.exports = handleSchemaValidationErrors;
