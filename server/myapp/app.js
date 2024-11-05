const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const mongoose = require("mongoose");
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');




const routes = require("./routes");
const app = express();
//connect to mangodb
const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the rate limit configuration
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
      error: 'Too many requests, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(apiLimiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api',apiLimiter, routes);
app.use(errorHandler);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
