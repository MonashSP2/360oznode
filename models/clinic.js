const mongoose = require('mongoose');


const clinicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    group: String,
    suburb: String,
    latitude : Number,
    longitude : Number,
    address : String,
    contactnumber: String,
    rating : Number,
    Website : String,



});

module.exports = mongoose.model('clinic', clinicSchema,'clinics');