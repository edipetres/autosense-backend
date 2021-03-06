// const logger = require('../utilities/logger')
const logger = console

const customResponses = {
  success(payload) {
    return this.status(200).json({
      success: true,
      payload,
    });
  },

  unauthorized(errorMessage) {
    return this.status(401).json({
      success: false,
      error: "unauthorized",
      errorMessage
    });
  },

  preconditionFailed(customError) {
    const errorMessage = customError || "precondition_failed"
    logger.error('Precondition failed:' + errorMessage)
    
    return this.status(412).json({
      success: false,
      error: errorMessage
    });
  },

  validationError(error) {
    if (!error || !error.errors) {
      return this.serverError();
    }

    let errorResponse = {};
    const typeFields = extractValidationType(error.errors);
    if (typeFields.length > 0) {
      errorResponse = typeFields;
    }

    return this.unprocessableEntity(errorResponse);
  },

  blocked() {
    return this.status(410).json({
      success: false,
      error: "version_blocked",
    });
  },

  unprocessableEntity(customError) {
    return this.status(422).json({
      success: false,
      error: "unprocessable_entity",
      payload: customError,
    });
  },

  notFound() {
    return this.status(404).json({
      success: false,
      error: "not_found",
    });
  },

  serverError(error) {
    logger.error('Server error: ' + error)
    return this.status(503).json({
      success: false,
      error: "server_error",
    });
  },
};

module.exports = (req, res, next) => {
  Object.assign(res, customResponses);
  next();
};

function extractValidationType(errors) {
  const fields = Object.keys(errors);
  return fields.map(key => errors[key])
    .map(validation => ({
      errorOnField: validation.path,
      message: validation.message
    }));
}