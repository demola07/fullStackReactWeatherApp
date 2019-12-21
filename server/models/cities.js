const db = require("../database");

class Cities {
  static retrieveALl(callback) {
    db.query("select city_name from cities", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  static insert(city, callback) {
    db.query("insert into cities (city_name) Values ($1)", [city], function(
      err,
      res
    ) {
      if (err.error) return callback(err);
      return callback(res);
    });
  }
}

module.exports = Cities;
