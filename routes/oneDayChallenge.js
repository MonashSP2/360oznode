const fetch = require('node-fetch')
const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');
const https = require("https");
const request = require('request');
const KEY = 'AIzaSyD_HKGG5CAXI7ZnekD_auJQ9m9EL_jnVwI';

router.get('/', (req, res, next) => {


    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&keyword=dog&key='+KEY;
    // const fetch = require('node-fetch')
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let aArray = [];
            // aArray = JSON.parse(aArray.toString());
            // const aObject = {};
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                };
                aArray.push(aObject)


            }

            res.status(200).send(JSON.stringify(aArray, undefined, 2))
        })
});

router.get('/:A/:B/:C/:lat/:lng', (req, res, next) => {

    const A = req.params.A;
    const B = req.params.B;
    const C = req.params.C;
    let lat = Number(req.params.lat);
    let lng = Number(req.params.lng);
    // lat = -37.884;
    // lng=145.0266;

    const urlA = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + A + '&key='+KEY;
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + B + '&key='+KEY;
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + C + '&key='+KEY;
    // const fetch = require('node-fetch');

    let aArray = [];
    let bArray = [];
    let cArray = [];
    let AB = [];
    let BC = [];
    // let DE = [];
    let aResutlt = [];

    fetch(urlA)
        .then(res => res.json())
        .then(json => {
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                };
                aArray.push(aObject)
            }
            fetch(urlB)
                .then(res => res.json())
                .then(json => {

                    let resultArray = json["results"];
                    for (let i = 0; i < resultArray.length; i++) {
                        let aObject = {
                            "id": resultArray[i]["id"],
                            "name": resultArray[i]["name"],
                            "latitude": resultArray[i]["geometry"]["location"]["lat"],
                            "longitude": resultArray[i]["geometry"]["location"]["lng"]
                        };
                        bArray.push(aObject)

                    }
                    fetch(urlC)
                        .then(res => res.json())
                        .then(json => {

                            let resultArray = json["results"];
                            for (let i = 0; i < resultArray.length; i++) {
                                let aObject = {
                                    "id": resultArray[i]["id"],
                                    "name": resultArray[i]["name"],
                                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                };
                                cArray.push(aObject)
                            }

                            // let temp1 = '';
                            // let temp2 = '';
                            // let temp0 = 9999999;
                            // for (let i =0; i <aArray.length;i++){
                            //     for (let j =0; j <bArray.length;j++){
                            //         let distance = Math.abs(aArray[i]["latitude"] - bArray[j]["latitude"])
                            //             + Math.abs(aArray[i]["longitude"] - bArray[j]["longitude"])
                            //             + Math.abs(aArray[i]["longitude"] - lng)
                            //             + Math.abs(aArray[i]["latitude"] - lat);
                            //         if (distance < temp0){
                            //             temp0 = distance;
                            //             temp1 = aArray[i];
                            //             temp2 = bArray[j];
                            //         }
                            //     }
                            //     AB.push([temp0,temp1,temp2])
                            // }
                            // console.log(AB);
                            let temp1 = '';
                            let temp2 = '';
                            let temp0 = 9999999;

                            for (let j = 0; j < aArray.length; j++) {
                                let distance = Math.abs(aArray[j]["longitude"] - lng)
                                    + Math.abs(aArray[j]["latitude"] - lat);
                                if (distance < temp0) {
                                    temp0 = distance;
                                    // temp1 = aArray[i];
                                    temp2 = aArray[j];
                                }
                            }
                            if (A !== "a") {
                                aResutlt.push(temp2);
}
                            // ltemp1 = '';
                            temp2 = '';
                            temp0 = 9999999;

                            for (let j = 0; j < bArray.length; j++) {
                                let distance = Math.abs(bArray[j]["longitude"] - lng)
                                    + Math.abs(bArray[j]["latitude"] - lat);
                                if (distance < temp0) {
                                    temp0 = distance;
                                    // temp1 = aArray[i];
                                    temp2 = bArray[j];
                                }
                            }
                            if (B !== "a") {
                                aResutlt.push(temp2);
                            }
                            temp2 = '';
                            temp0 = 9999999;

                            for (let j = 0; j < cArray.length; j++) {
                                let distance = Math.abs(cArray[j]["longitude"] - lng)
                                    + Math.abs(cArray[j]["latitude"] - lat);
                                if (distance < temp0) {
                                    temp0 = distance;
                                    // temp1 = aArray[i];
                                    temp2 = cArray[j];
                                }
                            }
                            if (C !== "a") {
                                aResutlt.push(temp2);
                            }
                            // AB.push(temp2);

                            // console.log(AB);


                            // temp1 = '';
                            // temp2 = '';
                            // temp0 = 9999;
                            // for (let i =0; i <bArray.length;i++){
                            //     for (let j =0; j <cArray.length;j++){
                            //         let distance = Math.abs(bArray[i]["latitude"] - cArray[j]["latitude"])
                            //             + Math.abs(bArray[i]["longitude"] - cArray[j]["longitude"]);
                            //         if (distance < temp0){
                            //             temp0 = distance;
                            //             temp1 = bArray[i];
                            //             temp2 = cArray[j];
                            //         }
                            //     }
                            //     BC.push([temp0,temp1,temp2])
                            // }
                            //
                            // let result = []
                            // for (let i =0;i<AB.length;i++){
                            //     result[i]=[];
                            // }
                            //
                            // for (let i =0;i<AB.length;i++){
                            //     for (let j = 0 ;j< BC.length;j++){
                            //         if (AB[i][2]===BC[j][1]){
                            //             // result[i][0]=AB[i][0]+BC[j][0];
                            //             result[i][0]=AB[i][1];
                            //             result[i][1]=AB[i][2];
                            //             result[i][2]=BC[j][2];
                            //         }
                            //     }
                            // }

                            // let finalArray = [];
                            // let finalDistance = 1000000;
                            // let finalIndex = 0;
                            // for (let i =0;i<result.length;i++){
                            //     if (result[i][0] < finalDistance){
                            //         finalDistance = result[i][0];
                            //         finalIndex = i;
                            //     }
                            // }

                            // let finalArray = result[finalIndex];
                            // res.status(200).end(JSON.stringify(finalArray, undefined, 2))
                            res.status(200).end(JSON.stringify(aResutlt, undefined, 2))
                        });

                });


        });

});

//four parameters
router.get('/:A/:B/:C/:D/:lat/:lng', (req, res, next) => {

    const A = req.params.A;
    const B = req.params.B;
    const C = req.params.C;
    const D = req.params.D;
    let lat = Number(req.params.lat);
    let lng = Number(req.params.lng);
    // lat = -37.884;
    // lng=145.0266;

    const urlA = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + A + '&key='+KEY;
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + B + '&key='+KEY;
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + C + '&key='+KEY;
    const urlD = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + D + '&key='+KEY;
    // const fetch = require('node-fetch');

    let aArray = [];
    let bArray = [];
    let cArray = [];
    let dArray = [];

    let aResutlt = [];

    fetch(urlA)
        .then(res => res.json())
        .then(json => {
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                };
                aArray.push(aObject)
            }
            fetch(urlB)
                .then(res => res.json())
                .then(json => {

                    let resultArray = json["results"];
                    for (let i = 0; i < resultArray.length; i++) {
                        let aObject = {
                            "id": resultArray[i]["id"],
                            "name": resultArray[i]["name"],
                            "latitude": resultArray[i]["geometry"]["location"]["lat"],
                            "longitude": resultArray[i]["geometry"]["location"]["lng"]
                        };
                        bArray.push(aObject)

                    }
                    fetch(urlC)
                        .then(res => res.json())
                        .then(json => {

                            let resultArray = json["results"];
                            for (let i = 0; i < resultArray.length; i++) {
                                let aObject = {
                                    "id": resultArray[i]["id"],
                                    "name": resultArray[i]["name"],
                                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                };
                                cArray.push(aObject)
                            }
                            fetch(urlD)
                                .then(res => res.json())
                                .then(json => {

                                    let resultArray = json["results"];
                                    for (let i = 0; i < resultArray.length; i++) {
                                        let aObject = {
                                            "id": resultArray[i]["id"],
                                            "name": resultArray[i]["name"],
                                            "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                            "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                        };
                                        dArray.push(aObject)
                                    }

                                    let temp1 = '';
                                    let temp2 = '';
                                    let temp0 = 9999999;

                                    for (let j = 0; j < aArray.length; j++) {
                                        let distance = Math.abs(aArray[j]["longitude"] - lng)
                                            + Math.abs(aArray[j]["latitude"] - lat);
                                        if (distance < temp0) {
                                            temp0 = distance;
                                            // temp1 = aArray[i];
                                            temp2 = aArray[j];
                                        }
                                    }
                                    if (A !== "a") {
                                        aResutlt.push(temp2);
                                    }
                                    // ltemp1 = '';
                                    temp2 = '';
                                    temp0 = 9999999;

                                    for (let j = 0; j < bArray.length; j++) {
                                        let distance = Math.abs(bArray[j]["longitude"] - lng)
                                            + Math.abs(bArray[j]["latitude"] - lat);
                                        if (distance < temp0) {
                                            temp0 = distance;
                                            // temp1 = aArray[i];
                                            temp2 = bArray[j];
                                        }
                                    }
                                    if (B !== "a") {
                                        aResutlt.push(temp2);
                                    }
                                    temp2 = '';
                                    temp0 = 9999999;

                                    for (let j = 0; j < cArray.length; j++) {
                                        let distance = Math.abs(cArray[j]["longitude"] - lng)
                                            + Math.abs(cArray[j]["latitude"] - lat);
                                        if (distance < temp0) {
                                            temp0 = distance;
                                            // temp1 = aArray[i];
                                            temp2 = cArray[j];
                                        }
                                    }
                                    if (C !== "a") {
                                        aResutlt.push(temp2);
                                    }
                                    temp2 = '';
                                    temp0 = 9999999;

                                    for (let j = 0; j < dArray.length; j++) {
                                        let distance = Math.abs(dArray[j]["longitude"] - lng)
                                            + Math.abs(dArray[j]["latitude"] - lat);
                                        if (distance < temp0) {
                                            temp0 = distance;
                                            // temp1 = aArray[i];
                                            temp2 = dArray[j];
                                        }
                                    }
                                    if (D !== "a") {
                                        aResutlt.push(temp2);
                                    }



                                    res.status(200).end(JSON.stringify(aResutlt, undefined, 2))
                                });
                        });

                });


        });

});

//five parameters
router.get('/:A/:B/:C/:D/:E/:lat/:lng', (req, res, next) => {

    const A = req.params.A;
    const B = req.params.B;
    const C = req.params.C;
    const D = req.params.D;
    const E = req.params.E;
    let lat = Number(req.params.lat);
    let lng = Number(req.params.lng);
    // lat = -37.884;
    // lng=145.0266;

    const urlA = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + A + '&key='+KEY;
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + B + '&key='+KEY;
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + C + '&key='+KEY;
    const urlD = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + D + '&key='+KEY;
    const urlE = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=1500&keyword=' + E + '&key='+KEY;
    // const fetch = require('node-fetch');

    let aArray = [];
    let bArray = [];
    let cArray = [];
    let dArray = [];
    let eArray = [];

    let aResutlt = [];

    fetch(urlA)
        .then(res => res.json())
        .then(json => {
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                };
                aArray.push(aObject)
            }
            fetch(urlB)
                .then(res => res.json())
                .then(json => {

                    let resultArray = json["results"];
                    for (let i = 0; i < resultArray.length; i++) {
                        let aObject = {
                            "id": resultArray[i]["id"],
                            "name": resultArray[i]["name"],
                            "latitude": resultArray[i]["geometry"]["location"]["lat"],
                            "longitude": resultArray[i]["geometry"]["location"]["lng"]
                        };
                        bArray.push(aObject)

                    }
                    fetch(urlC)
                        .then(res => res.json())
                        .then(json => {

                            let resultArray = json["results"];
                            for (let i = 0; i < resultArray.length; i++) {
                                let aObject = {
                                    "id": resultArray[i]["id"],
                                    "name": resultArray[i]["name"],
                                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                };
                                cArray.push(aObject)
                            }
                            fetch(urlD)
                                .then(res => res.json())
                                .then(json => {

                                    let resultArray = json["results"];
                                    for (let i = 0; i < resultArray.length; i++) {
                                        let aObject = {
                                            "id": resultArray[i]["id"],
                                            "name": resultArray[i]["name"],
                                            "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                            "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                        };
                                        dArray.push(aObject)
                                    }

                                    fetch(urlE)
                                        .then(res => res.json())
                                        .then(json => {

                                            let resultArray = json["results"];
                                            for (let i = 0; i < resultArray.length; i++) {
                                                let aObject = {
                                                    "id": resultArray[i]["id"],
                                                    "name": resultArray[i]["name"],
                                                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                                                    "longitude": resultArray[i]["geometry"]["location"]["lng"]
                                                };
                                                eArray.push(aObject)
                                            }


                                            let temp1 = '';
                                            let temp2 = '';
                                            let temp0 = 9999999;

                                            for (let j = 0; j < aArray.length; j++) {
                                                let distance = Math.abs(aArray[j]["longitude"] - lng)
                                                    + Math.abs(aArray[j]["latitude"] - lat);
                                                if (distance < temp0) {
                                                    temp0 = distance;
                                                    // temp1 = aArray[i];
                                                    temp2 = aArray[j];
                                                }
                                            }
                                            if (A !== "a") {
                                                aResutlt.push(temp2);
                                            }
                                            // ltemp1 = '';
                                            temp2 = '';
                                            temp0 = 9999999;

                                            for (let j = 0; j < bArray.length; j++) {
                                                let distance = Math.abs(bArray[j]["longitude"] - lng)
                                                    + Math.abs(bArray[j]["latitude"] - lat);
                                                if (distance < temp0) {
                                                    temp0 = distance;
                                                    // temp1 = aArray[i];
                                                    temp2 = bArray[j];
                                                }
                                            }
                                            if (B !== "a") {
                                                aResutlt.push(temp2);
                                            }
                                            temp2 = '';
                                            temp0 = 9999999;

                                            for (let j = 0; j < cArray.length; j++) {
                                                let distance = Math.abs(cArray[j]["longitude"] - lng)
                                                    + Math.abs(cArray[j]["latitude"] - lat);
                                                if (distance < temp0) {
                                                    temp0 = distance;
                                                    // temp1 = aArray[i];
                                                    temp2 = cArray[j];
                                                }
                                            }
                                            if (C !== "a") {
                                                aResutlt.push(temp2);
                                            }
                                            temp2 = '';
                                            temp0 = 9999999;

                                            for (let j = 0; j < dArray.length; j++) {
                                                let distance = Math.abs(dArray[j]["longitude"] - lng)
                                                    + Math.abs(dArray[j]["latitude"] - lat);
                                                if (distance < temp0) {
                                                    temp0 = distance;
                                                    // temp1 = aArray[i];
                                                    temp2 = dArray[j];
                                                }
                                            }
                                            if (D !== "a") {
                                                aResutlt.push(temp2);
                                            }
                                            temp2 = '';
                                            temp0 = 9999999;

                                            for (let j = 0; j < eArray.length; j++) {
                                                let distance = Math.abs(eArray[j]["longitude"] - lng)
                                                    + Math.abs(eArray[j]["latitude"] - lat);
                                                if (distance < temp0) {
                                                    temp0 = distance;
                                                    // temp1 = aArray[i];
                                                    temp2 = eArray[j];
                                                }
                                            }
                                            if (E !== "a") {
                                                aResutlt.push(temp2);
                                            }


                                            res.status(200).end(JSON.stringify(aResutlt, undefined, 2))
                                        });
                                });
                        });

                });


        });

});


module.exports = router;