const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');

const art = require('../models/art');
const history = require('../models/history');
const attraction = require('../models/attractions');
const wildlife = require('../models/wildlife');

router.get('/', (req, res, next) => {
    history.find().exec().then(docs =>{
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
router.get('/:A/:B/:C/:D/:lat/:lng', async (req, res, next) => {
    const A = req.params.A;
    const B = req.params.B;
    const C = req.params.C;
    const D = req.params.D;
    let lat = Number(req.params.lat);
    let lng = Number(req.params.lng);
    let aArray = [];
    let bArray = [];
    let cArray = [];
    let dArray = [];

    let aResutlt = [];

    let temp2 = '';
    let temp0 = 9999999;

    //arts
    if (A !== "a") {
        await art.find().exec().then(docs => {
            console.log(docs);
            aArray = docs;

             for (let j = 0; j < aArray.length; j++){
                 let distance = Math.abs(aArray[j]["longitude"] - lng)
                     + Math.abs(aArray[j]["latitude"] - lat);
                 if (distance < temp0) {
                     temp0 = distance;
                     // temp1 = aArray[i];
                     temp2 = aArray[j];
                 }
             }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        aResutlt.push(temp2);
    }

    //history
    temp2 = '';
    temp0 = 9999999;
    if (B !== "a") {
        await history.find().exec().then(docs => {
            console.log(docs);
            bArray = docs;

            for (let j = 0; j < bArray.length; j++){
                let distance = Math.abs(bArray[j]["longitude"] - lng)
                    + Math.abs(bArray[j]["latitude"] - lat);
                if (distance < temp0) {
                    temp0 = distance;
                    temp2 = bArray[j];
                }
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        aResutlt.push(temp2);
    }

    //attraction
    temp2 = '';
    temp0 = 9999999;
    if (C !== "a") {
        await attraction.find().exec().then(docs => {
            console.log(docs);
            cArray = docs;

            for (let j = 0; j < cArray.length; j++){
                let distance = Math.abs(cArray[j]["longitude"] - lng)
                    + Math.abs(cArray[j]["latitude"] - lat);
                if (distance < temp0) {
                    temp0 = distance;
                    temp2 = cArray[j];
                }
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        aResutlt.push(temp2);
    }

    //wildlife
    temp2 = '';
    temp0 = 9999999;
    if (D !== "a") {
        await wildlife.find().exec().then(docs => {
            console.log(docs);
            dArray = docs;

            for (let j = 0; j < dArray.length; j++){
                let distance = Math.abs(dArray[j]["longitude"] - lng)
                    + Math.abs(dArray[j]["latitude"] - lat);
                if (distance < temp0) {
                    temp0 = distance;
                    temp2 = dArray[j];
                }
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        aResutlt.push(temp2);
    }


    res.status(200).json(aResutlt);
});


module.exports = router;