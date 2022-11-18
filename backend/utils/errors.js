HttpStatusCode = require("./httpStatusCode");

class BaseError extends Error {
  status;
  url;

  constructor(status, description, url) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.url = url;

    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(
    status = HttpStatusCode.UNPROCESSABLE_ENTITY,
    description = "Internal server error",
    url = ""
  ) {
    super(status, description, url);
  }
}

class InvalidQueryError extends BaseError {
  constructor(url = "") {
    super(HttpStatusCode.UNPROCESSABLE_ENTITY, "Invalid Query", url);
  }
}

module.exports = {
  APIError,
  InvalidQueryError,
};
