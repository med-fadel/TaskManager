var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
  var dbo = db.db("Manager");
  console.log("Database created!");
  dbo.createCollection("task", function(err, res) {
    if (err) throw err;
    db.close();
  });
  dbo.createCollection("user", function(err, res) {
    if (err) throw err;
    db.close();
  });
  dbo.createCollection("tag", function(err, res) {
    if (err) throw err;
    db.close();
  });
  console.log("Collections created!");
});