var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var userService = require('./business/userService')

var app = express();

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

app.post("/login", function (req, res) {
    console.log(req.body);
    var params = {
        email: req.body.email,
        password: req.body.password
    };
    userService.login(params, function (response) {
        res.json(response);
    });
});

app.post("/signup", function (req, res) {
    console.log(req.body);
    var params = {
        email: req.body.email,
        password: req.body.password
    };
    userService.createUser(params, function (response) {
        res.json(response);
    });
});

app.listen(3001);
console.log("Server running on port 3001");
