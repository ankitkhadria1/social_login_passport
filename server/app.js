//dependency
var express = require('express');
var path = require('path');
var logger   = require('morgan');
var swig = require('swig');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('favicon'); 
var passport  = require('passport');
var session = require('express-session');  
var mongoose = require('mongoose');


var route = require('./routes/index.js');
//express instance
var app = express();

// mongoose.connect('mongodb://localhost:3000/passport-social-auth-1');
var mongoURI = "mongodb://localhost:3000/passport-social-auth-1";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

// view engine
var swig = new swig.Swig();
app.engine('html' , swig.renderFile);
app.set('view engine','html');

// static dir

app.set('views', path.join(__dirname ,'views'));

//config middleware

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../client/public')));

//route
app.use('/',route);

// manage session
app.use(session({
  secret : 'keyboard cat',
  resave : true,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
// error handling and send 404 error
app.use(function(err,req,res,next)
{
  var err= new Error('you are landed on wrong page');
  err.status = 404;
  next(err);

});

// general error

if(app.get('env')=== 'development')
{
  app.use(function(err,req,res,next){
    res.status(err.status||500);
    res.render('error',{
      message :err.message,
      error :{}
    });
  });
}
module.exports = app;