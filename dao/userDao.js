var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/taskManager';

var UserDao = function () {}

//Find a user by his email
UserDao.getUserByEmail = function (email, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('user');
        collection.findOne({
            email: email
        }, function (err, result) {
            cb(result);
            db.close();
        });
    });
}

//Create new user
UserDao.addUser = function (user, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('user');
        collection.insert(user, function (err, result) {
            cb(result.ops[0]);
            db.close();
        });
    });
}

module.exports = UserDao;