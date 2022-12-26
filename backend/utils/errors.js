HttpStatusCode = require("./httpStatusCode");

class BaseError extends Error {
  status;
  url;

  constructor(status, message, url) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.url = url;

    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(
    status = HttpStatusCode.INTERNAL_SERVER,
    message = "Internal server error",
    url = ""
  ) {
    super(status, message, url);
  }
}

class NotFoundError extends BaseError {
  constructor(url = "") {
    super(HttpStatusCode.NOT_FOUND, "Not found!", url);
  }
}

class InvalidQueryError extends BaseError {
  constructor(url = "") {
    super(HttpStatusCode.UNPROCESSABLE_ENTITY, "Invalid Query", url);
  }
}

class InvalidFormatError extends BaseError {
  constructor(url = "") {
    super(HttpStatusCode.INVALID_FORMAT, "Invalid Format", url);
  }
}

class BadRequestError extends BaseError {
  constructor(message = "Bad Request", url = "") {
    super(HttpStatusCode.BAD_REQUEST, message, url);
  }
}

module.exports = {
  APIError,
  NotFoundError,
  InvalidQueryError,
  InvalidFormatError,
  BadRequestError,
};
