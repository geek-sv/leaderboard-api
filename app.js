var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var tokenconfig = require('./config/role.js');
//config settings for example: mongodb uri
var config = require('./config/config.json');

var routes = require('./routes/index');

var authentication = require('./routes/auth');
//create token for apps
var auth = require('./routes/auth');

var users = require('./routes/users');
// require games pages
var games = require('./routes/games');

var players = require('./routes/players');

var score = require('./routes/scores');

var leaderboard= require('./routes/leaderboard');

var app = express();

//connecting with mongolab
mongoose.connect(config.dbURL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', authentication);
app.use('/', routes);
app.use('/leaderboard', leaderboard);
app.use('/users', users);
app.use('/score', score);
app.use('/newscore', score);
//routes 
app.use('/players', players);
app.use('/newplayer', players);

app.use('/games', games);
app.use('/newgame',games);
app.use('/gamelist',games);
app.use('/:id',games);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
