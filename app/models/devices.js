// load the things we need
var mongoose = require("mongoose");

var devicesSchema = mongoose.Schema({

        type : String,
        brand : String,
        model  : String,
        year: Number,
         clinicalapp: String,
       framerate: String
     });

module.exports = mongoose.model("Devices", devicesSchema);
