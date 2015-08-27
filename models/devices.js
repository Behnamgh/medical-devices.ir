// load the things we need
var mongoose = require("mongoose");

var devicesSchema = mongoose.Schema({

        model  : String,
        date: Number,
         clinicalapp: String,
       framerate: String
     });

module.exports = mongoose.model("Devices", devicesSchema);
