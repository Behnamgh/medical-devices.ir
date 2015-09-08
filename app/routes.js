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
    Devices.find({
      "brand": req.query.brandname,
      "type": "sono"
    }).exec(function(error, finderresult) {
      res.json(finderresult);
    });
  });

//for angular templateUrl
///sono/philips/model///sono/mindray/model///sono/model/preview
app.get("/sono/philips/model", function(req, res) {
  res.render("philips.ejs");
});
app.get("/sono/mindray/model", function(req, res) {
  res.render("mindray.ejs");
});
app.get("/main", function(req, res) {
  res.render("main.ejs");
});
app.get("/sono", function(req, res) {
  res.render("sono.ejs");
});
app.get("/sono/model/preview", function(req, res) {
  res.render("modelpreview.ejs");
});
////end of angular

  app.get("/sono/mindray", function(req, res) {
    res.render("mindray.ejs");
  });

  app.get("/sono/siemens", function(req, res) {
    res.render("siemens.ejs");
  });



  app.get("/sono/philips", function(req, res) {
    res.render("philips.ejs");
  });

    app.get("/sono/model/modelpre/:id", function(req, res) {
      Devices.find({
        "_id": req.params.id,
        "type": "sono"
      }).exec(function(error, finderresult) {
        res.json(finderresult);
      });
      });

      app.get("/sono/:id", function(req, res) {
        res.render("modelpreview.ejs");
        });

  app.post("/deviceadd", function(req, res) {
    var newDevices = new Devices();
    var pic = req.body.type + "/" + req.body.brandname + "/" + req.body.modelname + ".jpg";
    newDevices.type = req.body.type;
    newDevices.brand = req.body.brandname;
    newDevices.model = req.body.modelname;
    newDevices.year = req.body.yearselect;
    newDevices.clinicalapp = req.body.clinicalapp;
    newDevices.diffrent = req.body.diffrent;
    newDevices.mechanic = req.body.mechanic;
    newDevices.annular = req.body.annular;
    newDevices.linear = req.body.linear;
    newDevices.convex = req.body.convex;
    newDevices.phased = req.body.phased;
    newDevices.multifq = req.body.multifq;
    newDevices.endovaginal = req.body.endovaginal;
    newDevices.endorectal = req.body.endorectal;
    newDevices.other = req.body.other;
    newDevices.framerate = req.body.framerate;
    newDevices.grayscale = req.body.grayscale;
    newDevices.preprocess = req.body.preprocess;
    newDevices.postprocess = req.body.postprocess;
    newDevices.dispdepth = req.body.dispdepth;
    newDevices.mmode = req.body.mmode;
    newDevices.mmode2d = req.body.mmode2d;
    newDevices.a3d = req.body.a3d;
    newDevices.a4d = req.body.a4d;
    newDevices.harmonicimaging = req.body.harmonicimaging;
    newDevices.dopplertype = req.body.dopplertype;
    newDevices.fqdisp = req.body.fqdisp;
    newDevices.veldisp = req.body.veldisp;
    newDevices.power = req.body.power;
    newDevices.duplex = req.body.duplex;
    newDevices.triplex = req.body.triplex;
    newDevices.digital = req.body.digital;
    newDevices.selectable = req.body.selectable;
    newDevices.adjustable = req.body.adjustable;
    newDevices.dynamicrec = req.body.dynamicrec;
    newDevices.measurements = req.body.measurements;
    newDevices.rtimg = req.body.rtimg;
    newDevices.freez = req.body.freez;
    newDevices.capacity = req.body.capacity;
    newDevices.cine = req.body.cine;
    newDevices.dicom = req.body.dicom;
    newDevices.pacs = req.body.pacs;
    newDevices.cardiac = req.body.cardiac;
    newDevices.vasc = req.body.vasc;
    newDevices.ob = req.body.ob;
    newDevices.others = req.body.others;
    newDevices.progprot = req.body.progprot;
    newDevices.userprog = req.body.userprog;
    newDevices.transrec = req.body.transrec;
    newDevices.transperineal = req.body.transperineal;
    newDevices.monitor = req.body.monitor;
    newDevices.split = req.body.split;
    newDevices.power = req.body.power;
    newDevices.batterybattery = req.body.battery;
    newDevices.hwd = req.body.hwd;
    newDevices.weight = req.body.weight;
    newDevices.warr = req.body.warr;



    newDevices.pic = pic;

    newDevices.save(function(err) {
      console.error(err);
      return;
    });
    res.send("your devices added to list,thank you very muchhhhhh");
  });
  app.get("/mongo", isLoggedIn, function(req, res) {
      Devices.find({}).exec(function(error, results) {
        res.json(results);
      });
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
