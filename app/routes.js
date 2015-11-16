"use strict";
var Devices = require("./models/devices");

module.exports = function(app, passport) {

  // normal routes-------------------------------------------------------------


  // show the home page (will also have our login links)
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });

  app.get("/ultrasoundgraphy", function(req, res) {
    res.render("ultrasound.ejs");
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

  app.get("/brands/:type", function(req, res) {
    Devices.find({
      "type": req.params.type
    }).exec(function(error, finderresult) {
      res.json(finderresult);
    });
  });

//for angular templateUrl
///ultrasound/philips/model///ultrasound/mindray/model///ultrasound/model/preview

app.get("/main", function(req, res) {
  res.render("main.ejs");
});
app.get("/type", function(req, res) {
  res.render("type.ejs");
});
app.get("/ultrasound/model/preview", function(req, res) {
  res.render("modelpreview.ejs");
});

app.get("/ultrasound/brandpreview", function(req, res) {
  res.render("brandpreview.ejs");
});
app.get("/angular/contactus", function(req, res) {
  res.render("contact.ejs");
});
app.get("/angular/aboutus", function(req, res) {
  res.render("about.ejs");
});
app.get("/search", function(req, res) {
  res.render("searchresult.ejs");
});
////end of angular///ultrasound/brandpreview

app.get("/compare1", function(req, res) {
  res.render("compare.ejs");
});
app.get("/compare2", function(req, res) {
  res.render("compare2.ejs");
});
app.get("/compare3", function(req, res) {
  res.render("compare3.ejs");
});



    app.get("/:devicetype/model/:id", function(req, res) {
      Devices.find({
        "_id": req.params.id,
        "type": req.params.devicetype
      }).exec(function(error, finderresult) {
        res.json(finderresult);
      });
      });

      app.get("/angular/mongo", function(req, res) {
        Devices.find({}).exec(function(error, finderresult) {
          res.json(finderresult);
        });
        });



        app.get("/searched/:searchkey", function(req, res) {
          Devices.find( {$or: [{'brand': {'$regex': req.params.searchkey}}, {'model': {'$regex': req.params.searchkey}}, {'type': {'$regex': req.params.searchkey}}]})
          .exec(function(error, finderresult) {
            res.json(finderresult);
          });
          });

        // { model: { $regex: [ req.params.searchkey]  }},  {  brand: { $regex: [ req.params.searchkey]  }}


  app.post("/ultrasoundadd", function(req, res) {
    var newDevices = new Devices();
    var pic = "ultrasound/" + req.body.brandname + "/" + req.body.modelname + ".jpg";
    newDevices.type = "ultrasound";
    newDevices.brand = req.body.brandname;
    newDevices.model = req.body.modelname;
    newDevices.year = req.body.year;
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
    newDevices.powerr = req.body.powerr;
    newDevices.battery = req.body.battery;
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
    app.get("/:type/brands/:brandname", function(req, res) {
      Devices.find({
        "brand": req.params.brandname,
        "type": req.params.type
      }).exec(function(error, finderresult) {
        res.json(finderresult);
      });
    });
    app.get("/:type/brandsfilter/:brandname/:filterid", function(req, res) {
      Devices.find({
        "brand": req.params.brandname,
        "type": req.params.type,
        "_id": { $ne: req.params.filterid }
      }).exec(function(error, finderresult) {
        res.json(finderresult);
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
