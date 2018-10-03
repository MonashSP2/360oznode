const fetch = require('node-fetch')
const express = require('express');
const router = express.Router();
// const KEY = 'AIzaSyD_HKGG5CAXI7ZnekD_auJQ9m9EL_jnVwI';//Pam
// const KEY = 'AIzaSyA9AsNR1CEC9DhDkro8FOnmDXHjaYjz5PM';//Ping
const KEY = 'AIzaSyD05onCqk7_ef5A4G6dsMXi-wUKwsKSF-Y';
router.get('/', (req, res, next) => {

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&keyword=dog&key=' + KEY;
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
                    "longitude": resultArray[i]["geometry"]["location"]["lng"],
                    "rating": resultArray[i]["rating"],
                    "address":resultArray[i]["vicinity"]
                };
                aArray.push(aObject)


            }

            res.status(200).send(JSON.stringify(aArray, undefined, 2))
        })
});

router.get('/:A/:B/:C/:D/:lat/:lng', async (req, res, next) => {

    const A = req.params.A;
    const AA = A.split('&');
    const B = req.params.B;
    const BB = B.split('&');
    const C = req.params.C;
    const CC = C.split('&');
    const D = req.params.D;
    const DD = D.split('&');
    let lat = Number(req.params.lat);
    let lng = Number(req.params.lng);
    // lat = -37.884;
    // lng=145.0266;

    const urlA = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&type='+ AA[0]+'&radius=2500&keyword=' + AA[1] + '&key=' + KEY;
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&type='+ BB[0]+'&radius=2500&keyword=' + BB[1] + '&key=' + KEY;
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&type='+ CC[0]+'&radius=2500&keyword=' + CC[1] + '&key=' + KEY;
    const urlD = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&type='+ DD[0]+'&radius=2500&keyword=' + DD[1] + '&key=' + KEY;
    // const fetch = require('node-fetch');

    let aArray = [];
    let bArray = [];
    let cArray = [];
    let dArray = [];

    let aResutlt = [];

    await fetch(urlA)
        .then(res => res.json())
        .then(json => {
            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"],
                    "address":resultArray[i]["vicinity"],
                    "type":AA[0]
                };
                aArray.push(aObject)
            }
        });

    await fetch(urlB)
        .then(res => res.json())
        .then(json => {

            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"],
                    "address":resultArray[i]["vicinity"],
                    "type":BB[0]
                };
                bArray.push(aObject)
            }
        });

    await fetch(urlC)
        .then(res => res.json())
        .then(json => {

            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"],
                    "address":resultArray[i]["vicinity"],
                    "type":CC[0]
                };
                cArray.push(aObject)
            }
        });

    await fetch(urlD)
        .then(res => res.json())
        .then(json => {

            let resultArray = json["results"];
            for (let i = 0; i < resultArray.length; i++) {
                let aObject = {
                    "id": resultArray[i]["id"],
                    "name": resultArray[i]["name"],
                    "latitude": resultArray[i]["geometry"]["location"]["lat"],
                    "longitude": resultArray[i]["geometry"]["location"]["lng"],
                    "address":resultArray[i]["vicinity"],
                    "type":DD[0]
                };
                dArray.push(aObject)
            }
        });
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
        + lat + ',' + lng + '&radius=2500&keyword=' + A + '&key=' + KEY;
    const urlB = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=2500&keyword=' + B + '&key=' + KEY;
    const urlC = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=2500&keyword=' + C + '&key=' + KEY;
    const urlD = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=2500&keyword=' + D + '&key=' + KEY;
    const urlE = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ',' + lng + '&radius=2500&keyword=' + E + '&key=' + KEY;
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

                                            //final result
                                            let sortResult = [];
                                            let basePointLng = lng;
                                            let basePointLat = lat;

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
                                                //aResutlt.push(temp2);
                                                sortResult.push(temp2);
                                                basePointLng = temp2["longitude"];
                                                basePointLat = temp2["latitude"];
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

                                            temp2 = '';
                                            temp0 = 9999999;
                                            while (aResutlt.length >0 ) {
                                                for (let j = 0; j < aResutlt.length; j++) {
                                                    let distance = Math.abs(basePointLng - lng)
                                                        + Math.abs(basePointLat - lat);
                                                    if (distance < temp0) {
                                                        temp0 = distance;
                                                        temp2 = j;
                                                    }
                                                }
                                                sortResult.push(aResutlt[temp2]);
                                                basePointLng = aResutlt[temp2]["longitude"];
                                                basePointLat = aResutlt[temp2]["latitude"];
                                                aResutlt.splice(temp2,1);
                                            }


                                            res.status(200).end(JSON.stringify(sortResult, undefined, 2))
                                        });
                                });
                        });

                });


        });

});


module.exports = router;