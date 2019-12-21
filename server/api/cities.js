var express = require("express");
var Cities = require("../models/cities");

var router = express.Router();

router.get("/", (req, res) => {
  Cities.retrieveALl((err, cities) => {
    if (err) return res.json(err);
    return res.json(cities);
  });
});

router.post("/", (req, res) => {
  const city = req.body.city;

  Cities.insert(city, (err, result) => {
    if (err) return res.json(err);

    return res.json(result);
  });
});

module.exports = router;
