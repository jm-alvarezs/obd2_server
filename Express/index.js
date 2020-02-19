const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("tnc_mysql_connector");
const chalk = require("chalk");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  app.post("/datos", async (req, res, next) => {
    try {
      const data = req.body;
      await db.procedures.insertDato(data.VIN, data.cmdID, data.cmdResult, data.timestamp);
      res.sendStatus(200);
    } catch (error) {
      console.log(chalk.red(error));
      res.status(500).send(error);
      next(error);
    }
  });

  app.listen(port, () => {
    console.log("Embebidos Server listening on port " + port);
  });
}).catch(error => {
  console.log(chalk.red(error));
})
