const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/index");
const { APIError } = require("./utils/errors");
const migrate = require("./database/migration");
const httpStatusCode = require("./utils/httpStatusCode");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new APIError(httpStatusCode.NOT_FOUND, "Endpoint not found!"));
});

// error logger
app.use(function (err, req, res, next) {
  console.log(err);
  next(err); // calling next middleware
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((error) => error.message);
    res.status(httpStatusCode.INVALID_FORMAT).json({ errors });
    return;
  }

  const status = err.status || httpStatusCode.INTERNAL_SERVER;
  res.status(status).json({ error: err.message });
});

module.exports = app;
