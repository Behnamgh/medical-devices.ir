"use strict";
var Devices = require("./models/devices");
var User = require("./models/user");
var mongoose = require("mongoose");


module.exports = function(app, passport) {

  // normal routes-------------------------------------------------------------
  mongoose.connect("mongodb://behnam:locked@ds049288.mongolab.com:49288/behnam"); // connect to our database


  // show the home page (will also have our login links)
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });
  
  //=====================this part most be deleted and its for game register test=======
  app.get("/register", function(req, res) {
    var host = req.get("host");
    if (req.query.rand) {
      if ((req.protocol + "://" + req.get("host")) == ("http://" + host)) {
        User.findOne({
          "nickname": req.query.nick
        }).exec(function(err, result) {
          console.log(result);
          if (result.registered == false) {
            if (result.randomkey == req.query.rand) {
              User.update({
                "nickname": req.query.nick,
                "registered": false
              }, {
                $set: {
                  "registered": true
                }
              }, function(err) {
                console.log(err);
              });
              console.log(result.email + " is verified");
              var txt = 'https://api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/sendMessage?chat_id=110176673&text=linke click shode doroste va ' + req.query.nick + ' ok shod';
              res.format({
                'text/html': function() {
                  res.send('<p>hey,activation nickname ' + req.query.nick + ' register shod va hame chi oke,hala mikhay behet telegram beshe <a href="' + txt + '">inja</a>click kon</p>');
                }
              });
            } else {
              console.log("ay namard codet ghalate sheytoon fek kardi inja kojas????");
              res.send("ay namard codet ghalate sheytoon fek kardi inja kojas????");
            }
          } else {
            res.send("ghablan nicknamet register shode jooje");
          }
        })
      } else {
        console.error(err);
        res.send("An error occurd please contact to admin,email:behnam.ghafary@gmail.com")
      }
    } else {
      res.send("please click on the right link");
      console.log("someone try to click on wrong link for verify email")
    }
  });
  //==============until here delet it

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
    Devices.find({
        $or: [{
          'brand': {
            '$regex': req.params.searchkey
          }
        }, {
          'model': {
            '$regex': req.params.searchkey
          }
        }, {
          'type': {
            '$regex': req.params.searchkey
          }
        }]
      })
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
      "_id": {
        $ne: req.params.filterid
      }
    }).exec(function(error, finderresult) {
      res.json(finderresult);
    });
  });
  

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect("/");
}
