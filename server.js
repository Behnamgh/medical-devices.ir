var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require('passport');
var session = require("express-session");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

//----------------------------
//mongoose.connect("mongodb://behnam:locked@ds041623.mongolab.com:41623/medicaldevice"); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', __dirname + '/views');
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(session({
  secret: 'behnamgoozSCREW19locked'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

//--------------------------
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

//-------------------------------
app.listen(port);
console.log("The magic happens on port " + port);
