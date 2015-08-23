var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");


//------------------------------
app.set('views', __dirname + '/views');
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));
app.set("view engine", "ejs");
app.use(express.static('public'));


//-------------------------
require("./app/routes.js")(app); // load our routes and pass in our app and fully configured passport

//-------------------------------
app.listen(port);
console.log("The magic happens on port " + port);
