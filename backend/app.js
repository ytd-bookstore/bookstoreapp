const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/index");
const { APIError } = require("./utils/errors");
const migrate = require("./database/migration");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(APIError(404, "Not Found"));
});

// error logger
app.use(function (err, req, res, next) {
  console.log(err);
  next(err); // calling next middleware
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  const status = err.status || 500;

  res.status(status).json({ message: err.message });
});

module.exports = app;
