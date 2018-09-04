const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');

const restaurant = require('../models/restaurant');


router.get('/', (req, res, next) => {
    restaurant.find().limit(10).exec().then(docs =>{
        console.log(docs);
        res.status(200).send(JSON.stringify(docs,undefined,2));
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});
router.get('/:xLowLeft/:yLowLeft/:xHighRight/:yHighRight', (req, res, next) => {
    const xLowLeft = Number(req.params.xLowLeft);
    const yLowLeft = Number(req.params.yLowLeft);
    const xHighRight = Number(req.params.xHighRight);
    const yHighRight = Number(req.params.yHighRight);

    restaurant.find({latitude:{$gt:xLowLeft,$lt:xHighRight},longitude:{$gt:yLowLeft,$lt:yHighRight}}).sort( { votes: -1 } ).limit(50).exec().then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;