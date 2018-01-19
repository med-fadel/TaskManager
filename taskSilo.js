var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var taskService = require('./business/taskService');

var app = express();
var httpPort = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/saveTask", function (req, res) {
    var params = req.body.task;
    taskService.saveTask(params, function (response) {
        //console.log(response);
        res.json(response);
    });
});

app.post("/saveTasks", function (req, res) {
    var params = req.body.tasks;
    taskService.saveTasks(params, function (response) {
        //console.log(response);
        res.json(response);
    });
});

app.post("/findTagsTasks", function (req, res) {
    var params = req.body.tagID;
    var taskType = req.body.done;

    if (taskType === 'all') {
        taskService.findTagsTasks(params, function (response) {
            //console.log(response);
            res.json(response);
        });
    } else if (taskType === 'true') {
        taskService.findTagsDoneTasks(params, function (response) {
            //console.log(response);
            res.json(response);
        });
    }
    else {
        taskService.findTagsNotDoneTasks(params, function (response) {
            //console.log(response);
            res.json(response);
        });
    }
});

app.post("/removeTask", function (req, res) {
    var params = req.body.taskID;

    taskService.removeTask(params, function (response) {
        //console.log(response);
        res.json(response);
    });
});

app.post("/updateTask", function (req, res) {
    var params = req.body.taskID;
    var taskType = req.body.done;

    if (taskType === 'true') {
        taskService.setTaskDone(params, function (response) {
            //console.log(response);
            res.json(response);
        });
    }
    else {
        taskService.setTaskNotDone(params, function (response) {
            //console.log(response);
            res.json(response);
        });
    }
});

app.post("/saveTag", function (req, res) {
    var params = req.body.tag;

    taskService.saveTag(params, function (response) {
        //console.log(response);
        res.json(response);
    });
});

app.post("/findUsersTags", function (req, res) {
    var userID = req.body.userID;

    taskService.findUsersTags(userID, function (response) {
        //console.log(response);
        res.json(response);
    });
});

app.listen(httpPort);
console.log("TaskSilo is running on port " + httpPort);
