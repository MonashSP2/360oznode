const mongoose = require('mongoose');


const storeSchema = mongoose.Schema({
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

module.exports = mongoose.model('store', storeSchema,'stores');