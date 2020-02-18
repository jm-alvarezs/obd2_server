const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

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

app.post("/datos", async (req, res, next) => {
  try {
    const data = req.body;
    axios.post("http://localhost:4001/data", data).then(response => {
        res.status(200).send(response.data);
    }).catch(error => {
        throw error;
    });
  } catch (error) {
    console.log(chalk.red(error));
    res.status(500).send(error);
    next(error);
  }
});

app.listen(port, () => {
  console.log("Embebidos Server listening on port " + port);
});
