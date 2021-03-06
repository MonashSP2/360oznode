const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');
const https = require("https");
const request = require('request');
// const KEY = 'AIzaSyD_HKGG5CAXI7ZnekD_auJQ9m9EL_jnVwI';//Pam
// const KEY = 'AIzaSyA9AsNR1CEC9DhDkro8FOnmDXHjaYjz5PM';//Ping
const KEY = 'AIzaSyD05onCqk7_ef5A4G6dsMXi-wUKwsKSF-Y';

// const restaurant = require('../models/restaurant');


router.get('/', (req, res, next) => {


    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=chineseresturant&keyword=resturant&key='+KEY;
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

router.get('/:interest/:lat/:lng', (req, res, next) => {
    const interest = req.params.interest;
    const lat = Number(req.params.lat);
    const lng = Number(req.params.lng);

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ','+ lng +'&radius=1500&keyword='+ interest +'&key='+KEY;
    const fetch = require('node-fetch')
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++){
                let aObject = {
                    "id":resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude":resultArray[i]["geometry"]["location"]["lat"],
                    "longitude":resultArray[i]["geometry"]["location"]["lng"],
                    "rating": resultArray[i]["rating"],
                    "address":resultArray[i]["vicinity"]
                };
                aArray.push(aObject)


            }

            res.status(200).send(JSON.stringify(aArray, undefined, 2))
        })
});


module.exports = router;