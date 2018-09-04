const mongoose = require('mongoose');


// const productSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String,
//     price: Number
// });

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CensusYear : Number,
    Group : String,
    name : String,
    Description : String,
    Suburb : String,
    xcoordinate : Number,
    ycoordinate : Number,
    Location : String
});


module.exports = mongoose.model('Product', productSchema,'projectData');
