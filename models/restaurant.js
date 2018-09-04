const mongoose = require('mongoose');


const restaurantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    description : String,
    address : String,
    rating : Number,
    votes : Number,
    latitude : Number,
    longitude : Number,
    group: String

});

module.exports = mongoose.model('restaurant', restaurantSchema,'restaurants');