"use strict";
var Devices = require("./models/devices");

module.exports = function(app, passport) {

  // normal routes-------------------------------------------------------------


  // show the home page (will also have our login links)
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });

  app.get("/sonography", function(req, res) {
    res.render("sono.ejs");
  });

  // LOGIN ===============================
  // show the login form
  app.get("/login", function(req, res) {
    res.render("login.ejs", {
      message: req.flash("loginMessage")
    });
  });

  // process the login form
  app.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function(req, res) {
    res.render("signup.ejs", {
      message: req.flash("signupMessage")
    });
  });

  // process the signup form
  /*
  app.post("/signup", passport.authenticate("local-signup", {
              successRedirect : "/profile", // redirect to the secure profile section
              failureRedirect : "/signup", // redirect back to the signup page if there is an error
              failureFlash : true // allow flash messages
          }));
          */
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile.ejs");
  });

  app.get("/brands/brands", function(req, res) {
    var finderresult = req.query.brandname;
  Devices.find({"brand" : req.query.brandname, "type" : "sono"}).exec(function(error, finderresult)  {
    res.json(finderresult);
});
    });

    app.get("/sono/mindray", function(req, res) {
      res.render("mindray.ejs");
    });

    app.get("/sono/siemens", function(req, res) {
      res.render("siemens.ejs");
    });

    app.get("/sono/philips", function(req, res) {
      res.render("philips.ejs");
    });

  app.post("/deviceadd", function(req, res) {
    var newDevices = new Devices();
    var pic = req.body.type + "/" + req.body.brandname  + "/" + req.body.modelname + ".jpg";
    newDevices.type = req.body.type;
    newDevices.brand = req.body.brandname;
    newDevices.model = req.body.modelname;
    newDevices.year = req.body.yearselect;
    newDevices.framerate = req.body.framerate;
    newDevices.pic = pic;
    newDevices.clinicalapp = req.body.clinicalapp;

    newDevices.save(function(err) {
      console.error(err);
      return;
    });
    res.send("your devices added to list,thank you very muchhhhhh");
  });

  app.get("/*", function(req, res) {
    res.render("index.ejs");
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect("/");
}
