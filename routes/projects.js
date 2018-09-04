const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');

const projectData = require('../models/projectData');


router.get('/', (req, res, next) => {
    projectData.find().limit(5).exec().then(docs =>{
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