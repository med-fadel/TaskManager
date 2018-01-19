//declaration part

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var session = require('express-session');
var jsonfile = require('jsonfile');
var randomstring = require("randomstring");
var CryptoJS = require("crypto-js");
var multer = require('multer');
var request = require('request');
var fs = require('fs');
var Ddos = require('ddos');

//create ddos rule
var ddos = new Ddos({burst:10, limit:15})

var app = express();
var httpPort = 80;
var httpsPort = 443;

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

//init http server
//var server = http.createServer(app);


//init session
var sessionMiddleware = session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false
});


app.use(sessionMiddleware);
app.use(ddos.express);

//init parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.set('view engine', 'jade');

//trace all http call
app.use(function (req, res, next) {
  next();
});

//authorize public to be access
app.use(express.static(path.join(__dirname, 'public')));

app.post('/getData', function (req, res) {
  res.send({
    data: 'hi'
  });
});

app.post('/savetask', function (req, res) {
  console.log(req.body);
  var params = { task: req.body.task };
  request.post({ url: "http://localhost:3000/saveTask", form: params }, function (error, response, body) {
    res.send(body);
  });
});

app.post('/getTasks', function (req, res) {
  console.log(req.body);
  var params = {
    tagID: req.body.tagID,
    done: req.body.done
  };
  request.post({ url: "http://localhost:3000/findTagsTasks", form: params }, function (error, response, body) {
    res.send(body);
  });
});

app.post('/removeTask', function (req, res) {
  console.log(req.body);
  var params = { taskID: req.body.taskID };
  request.post({ url: "http://localhost:3000/removeTask", form: params }, function (error, response, body) {
    res.send(body);
  });
});

app.post('/updateTask', function (req, res) {
  console.log(req.body);
  var params = {
    taskID: req.body.taskID,
    done: req.body.done
  };
  request.post({ url: "http://localhost:3000/updateTask", form: params }, function (error, response, body) {
    res.send(body);
  });
});

app.post('/login', function (req, res) {
  console.log(req.body);
  var params = {
    email: req.body.email,
    password: req.body.password
  };
  request.post({ url: "http://localhost:3001/login", form: params }, function (error, response, body) {
    var r = JSON.parse(body);
    res.json(r);
  });
});

app.post('/signup', function (req, res) {
  console.log(req.body);
  var params = {
    email: req.body.email,
    password: req.body.password
  };
  request.post({ url: "http://localhost:3001/signup", form: params }, function (error, response, body) {
    var r = JSON.parse(body);
    res.json(r);
  });
});

app.post('/savetag', function (req, res) {
  console.log(req.body);
  var params = { tag: req.body.tag };
  request.post({ url: "http://localhost:3000/saveTag", form: params }, function (error, response, body) {
    res.send(body);
  });
});

app.post('/getTags', function (req, res) {
  console.log(req.body);
  var params = {
    userID: req.body.userID,
  };
  request.post({ url: "http://localhost:3000/findUsersTags", form: params }, function (error, response, body) {
    res.send(body);
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers // development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Listen on provided port, on all network interfaces.
//server.listen(httpPort, ExecuteChromium);
https.createServer(options, app).listen(httpsPort, function () {
  console.log('Listening on ' + httpsPort);
});
//console.log('Listening on ' + httpPort);

function ExecuteChromium() { }