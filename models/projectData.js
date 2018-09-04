const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
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

module.exports = mongoose.model('projectData', projectSchema,'projectData');