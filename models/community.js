const mongoose = require('mongoose');


const communitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    group: String,
    suburb: String,
    latitude : Number,
    longitude : Number,
    address : String,
    contactnumber: String,
    rating : Number,
    website : String,



});

module.exports = mongoose.model('community', communitySchema,'communities');