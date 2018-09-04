const R = require("r-script");
const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');

// const restaurant = require('../models/restaurant');


router.get('/', (req, res, next) => {

    const out = R("../rScript/GooglePlacesV3.0.R")
        .data()
        .callSync();
    // return _.bindAll(obj, "data", "call", "callSync");
    // R.bindAll(out, "data", "call", "callSync");
    res.send(JSON.stringify(out,undefined,2));

    // out.exec().then(docs =>{
    //     console.log(docs);
    //     res.status(200).send(JSON.stringify(docs,undefined,2));
    // })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         })
    //     });
});

module.exports = router;