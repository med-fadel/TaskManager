var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/taskManager';

var taskDao = function () { }

taskDao.insertTask = function (task, cb) {
    task.done = false;
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.insert(task, function (err, r) {
            if (err) cb(err);
            else cb(r);
            db.close();
        });
    });
}

taskDao.insertTasks = function (tasks, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.insertMany(tasks, function (err, r) {
            if (err) cb(err);
            else cb(r);
            db.close();
        });
    });
}

taskDao.getTagsTasks = function (tagID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.find({
            tagID: tagID
        }).toArray(function (err, pubs) {
            if (err) cb(err);
            else cb(pubs);
            db.close();
        });
    });
}

taskDao.getTagsDoneTasks = function (tagID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.find({
            tagID: tagID,
            done: true
        }).toArray(function (err, pubs) {
            if (err) cb(err);
            else cb(pubs);
            db.close();
        });
    });
}

taskDao.getTagsNotDoneTasks = function (tagID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.find({
            tagID: tagID,
            done: false
        }).toArray(function (err, pubs) {
            if (err) cb(err);
            else cb(pubs);
            db.close();
        });
    });
}

taskDao.deleteTask = function (taskID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.remove({ id: taskID }, function (err, numberOfRemovedDocs) {
            cb(numberOfRemovedDocs.result.n);
            db.close();
        });
    });

}

taskDao.updateDoneTask = function (taskID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.update({ id: taskID }, { $set: { done: true } }, function (err, res) {
            cb(res);
            db.close();
        });
    });
}

taskDao.updateNotDoneTask = function (taskID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('task');
        collection.update({ id: taskID }, { $set: { done: false } }, function (err, res) {
            cb(res);
            db.close();
        });
    });
}

taskDao.insertTag = function (tag, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('tag');
        collection.insert(tag, function (err, r) {
            if (err) cb(err);
            else cb(r);
            db.close();
        });
    });
}

taskDao.getUsersTags = function (userID, cb) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('tag');
        collection.find({
            userID: userID
        }).toArray(function (err, pubs) {
            if (err) cb(err);
            else cb(pubs);
            db.close();
        });
    });
}

module.exports = taskDao;