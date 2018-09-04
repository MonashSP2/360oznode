const mongoose = require('mongoose');


const ethinicitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type : String,
    properties : {
        Suburb:String,
        Population:Number,
        REGION:String,
    },
    // geometry : {
    //     type:String,
    //     coordinates:[[[[Number,Number]]]],
    // },


});

module.exports = mongoose.model('ethinicity', ethinicitySchema,'geoc');