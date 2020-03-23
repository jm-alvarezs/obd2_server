const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("tnc_mysql_connector");
const chalk = require("chalk");
const Sentry = require('@sentry/node');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Sentry.init({ dsn: 'https://b74a035d1d2f4e89b8939f599c9e4ab7@sentry.io/5172247' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

require("dotenv").config();

db.connect().then(async () => {

  require("./startup/routes")("/api", app);

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    if(process.env.NODE_ENV !== "development") {
      res.statusCode = 500;
      res.end(res.sentry + "\n");
    };
  });

  app.listen(port, () => {
    console.log("Embebidos Server listening on port " + port);
  });
}).catch(error => {
  console.log(chalk.red(error));
})
