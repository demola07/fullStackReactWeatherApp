const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cities = require("./api/cities");
const weather = require("./api/weather");
var db = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/cities", cities);
app.use("/api/weather", weather);

if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// PostgreSQL Database Connection
db.query("select NOW()", (err, res) => {
  if (err.error) return console.log(err.error);

  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}!`);
});

module.exports = app;
