const mongoose = require('mongoose');


const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    types: String,
    latitude : Number,
    longitude : Number,
    address : String,
    contactnumber: String,
    rating : String,
    Website : String,
    suburb: String,



});

module.exports = mongoose.model('history', historySchema,'histories');