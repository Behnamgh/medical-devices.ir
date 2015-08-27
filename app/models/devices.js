// load the things we need
var mongoose = require("mongoose");

var devicesSchema = mongoose.Schema({

        brandname : String,
        modelname  : String,
        year: Number,
         clinicalapp: String,
       framerate: String
     });

module.exports = mongoose.model("Devices", devicesSchema);
