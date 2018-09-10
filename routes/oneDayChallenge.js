const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');
const https = require("https");
const request = require('request');

router.get('/', (req, res, next) => {


    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&keyword=dog&key=AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk';
    const fetch = require('node-fetch')
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {"id":resultArray[i]["id"],"name": resultArray[i]["name"],"latitude":resultArray[i]["geometry"]["location"]["lat"],"longitude":resultArray[i]["geometry"]["location"]["lng"]};
                aArray.push(aObject)


            }

            res.status(200).send(JSON.stringify(aArray, undefined, 2))
        })
});

router.get('/:A/:B/:C/:D/:lat/:lng', (req, res, next) => {
    const A = req.params.A;
    const B = req.params.B;
    const C = req.params.C;
    const D = req.params.D;
    const lat = Number(req.params.lat);
    const lng = Number(req.params.lng);

    const urlA = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ','+ lng +'&radius=1500&keyword='+ A +'&key=AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk';
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ','+ lng +'&radius=1500&keyword='+ B +'&key=AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk';
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ','+ lng +'&radius=1500&keyword='+ C +'&key=AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk';
    const urlD = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ','+ lng +'&radius=1500&keyword='+ D +'&key=AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk';
    const fetch = require('node-fetch');

    let aArray = [];
    let bArray = [];
    let cArray = [];
    let dArray = [];
    let AB = [];
    let BC = [];
    let CD = [];
    // let DE = [];

    fetch(urlA)
        .then(res => res.json())
        .then(json => {
            // let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {"id":resultArray[i]["id"],"name": resultArray[i]["name"],"latitude":resultArray[i]["geometry"]["location"]["lat"],"longitude":resultArray[i]["geometry"]["location"]["lng"]};
                aArray.push(aObject)

            }
            // console.log(aArray);
            //res.status(200).send(JSON.stringify(aArray, undefined, 2))
        });

    fetch(urlB)
        .then(res => res.json())
        .then(json => {
            // let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {"id":resultArray[i]["id"],"name": resultArray[i]["name"],"latitude":resultArray[i]["geometry"]["location"]["lat"],"longitude":resultArray[i]["geometry"]["location"]["lng"]};
                bArray.push(aObject)

            }
            // console.log(bArray);
            //res.status(200).send(JSON.stringify(aArray, undefined, 2))
        });

    fetch(urlC)
        .then(res => res.json())
        .then(json => {
            // let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {"id":resultArray[i]["id"],"name": resultArray[i]["name"],"latitude":resultArray[i]["geometry"]["location"]["lat"],"longitude":resultArray[i]["geometry"]["location"]["lng"]};
                cArray.push(aObject)
            }
            // console.log(cArray);
            //res.status(200).send(JSON.stringify(aArray, undefined, 2))
        });

    fetch(urlD)
        .then(res => res.json())
        .then(json => {
            // let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {"id":resultArray[i]["id"],"name": resultArray[i]["name"],"latitude":resultArray[i]["geometry"]["location"]["lat"],"longitude":resultArray[i]["geometry"]["location"]["lng"]};
                dArray.push(aObject)
            }
            // console.log(dArray);
            //res.status(200).send(JSON.stringify(aArray, undefined, 2))
        });
    console.log(dArray);

    let temp1 = '';
    let temp2 = '';
    let temp0 = 0;
    for (let i =0; i <aArray.length;i++){
        for (let j =0; j <bArray.length;j++){
            let distance = Math.abs(aArray[i]["latitude"] - bArray[j]["latitude"])
                + Math.abs(aArray[i]["longitude"] - bArray[j]["longitude"]);
            if (distance > temp0){
                temp0 = distance;
                temp1 = aArray[i];
                temp2 = bArray[j];
            }
        }
        AB.push([temp0,temp1,temp2])
    }

    temp1 = '';
    temp2 = '';
    temp0 = 0;
    for (let i =0; i <bArray.length;i++){
        for (let j =0; j <cArray.length;j++){
            let distance = Math.abs(bArray[i]["latitude"] - cArray[j]["latitude"])
                + Math.abs(bArray[i]["longitude"] - cArray[j]["longitude"]);
            if (distance > temp0){
                temp0 = distance;
                temp1 = bArray[i];
                temp2 = cArray[j];
            }
        }
        BC.push([temp0,temp1,temp2])
    }


    temp1 = '';
    temp2 = '';
    temp0 = 0;
    for (let i =0; i <cArray.length;i++){
        for (let j =0; j <dArray.length;j++){
            let distance = Math.abs(cArray[i]["latitude"] - dArray[j]["latitude"])
                + Math.abs(cArray[i]["longitude"] - dArray[j]["longitude"]);
            if (distance > temp0){
                temp0 = distance;
                temp1 = cArray[i];
                temp2 = dArray[j];
            }
        }
        CD.push([temp0,temp1,temp2])
    }
    console.log(AB);
    console.log(BC);
    console.log(CD);

    let result = []
    for (let i =0;i<AB.length;i++){
        result[i]=[];
    }

    for (let i =0;i<AB.length;i++){
        for (let j = 0 ;j< BC.length;j++){
            if (AB[i][2]===BC[j][1]){
                result[i][0]=AB[i][0]+BC[j][0];
                result[i][1]=AB[i][1];
                result[i][2]=AB[i][2];
                result[i][3]=BC[j][2];
            }
        }
    }

    for (let i =0;i<AB.length;i++){
        for (let j = 0 ;j< CD.length;j++){
            if (result[i][3]===CD[j][1]){
                result[i][0]=result[i][0] + CD[j][0];
                result[i][4]=CD[j][2];
            }
        }
    }
    // let finalArray = [];
    let finalDistance = 0;
    let finalIndex = 0;
    for (let i =0;i<result.length;i++){
        if (result[i][0] > finalDistance){
            finalIndex = i;
        }
    }

    let finalArray = result[finalIndex];
    // console.log(finalArray);
    res.status(200).end(JSON.stringify(aArray, undefined, 2)).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    // res.end(finalArray);





});


module.exports = router;