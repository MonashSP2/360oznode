const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();

//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

router.post('/', (req, res) =>{
    // let day1message = JSON.parse(res.body.day1message);
    // console.log(res.body.day1message);

    nodemailer.createTestAccount((err, account) => {
        let day1 = req.body.day1message;
        let day1Result = [];
        for (let i=0;i<day1.length;i++){
            if (day1[i]!==null) {
                day1Result.push(day1[i]["type"] +" "+ day1[i]["name"].link('www.google.com/maps/place/' + day1[i]["latitude"] + ',' + day1[i]["longitude"]));
            }
        }
        let day1JSON = JSON.stringify(day1Result,null,'\t');
        day1JSON=day1JSON.replace(/"/gi, '').replace(/\[/, '').replace(/\]/, '');


        let day2 = req.body.day2message;
        let day2Result = [];
        for (let i=0;i<day2.length;i++){
            if (day2[i]!==null) {
                day2Result.push(day2[i]["type"] +" "+ day2[i]["name"].link('www.google.com/maps/place/' + day2[i]["latitude"] + ',' + day2[i]["longitude"]));
            }
        }
        let day2JSON = JSON.stringify(day2Result,null,'\t');
        day2JSON=day2JSON.replace(/"/gi, '').replace(/\[/, '').replace(/\]/, '');

        // format day 3 message
        let day3 = req.body.day3message;
        let day3Result = [];
        for (let i=0;i<day3.length;i++){
            if (day3[i]!==null) {
                day3Result.push(day3[i]["types"] +" " + day3[i]["name"].link('www.google.com/maps/place/' + day3[i]["latitude"] + ',' + day3[i]["longitude"]));
            }
        }
        let day3JSON = JSON.stringify(day3Result,null,'\t');
        day3JSON=day3JSON.replace(/"/gi, '').replace(/\[/, '').replace(/\]/, '');
        // console.log(day1message);
        const htmlEmail = `
      <ul>
            <li>Hello and welcome to 360Oz!</li>
            <li>You have successfully generated your 3 Day Plan. Below are the details for your plan:</li>
      </ul>
            <h3>Day 1: ARRIVE</h3>
      <ul>
            <pre>${day1JSON}</pre>      
            <pre> </pre>
      </ul>
            <h3>Day 2: REVIVE</h3>

      <ul>
            <pre>${day2JSON}</pre>
            <pre> </pre>
      </ul>

            <h3>Day 3: IMMERSE</h3>

      <ul>
            <pre>${day3JSON}</pre>
            <pre> </pre>
      </ul>

        <h3>Thank you and we hope you enjoy your journey ahead!</h3>
    `
        let transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 587,
            secure: false,
            auth: {
                user: 'threesixtyoz@hotmail.com', // generated ethereal user
                // user: 'threesixtyoztest@hotmail.com',
                pass: 'Developweb3600' // generated ethereal password
            },

        });
        let mailOptions = {
            from: 'threesixtyoz@hotmail.com', // sender address
            // from: 'threesixtyoztest@hotmail.com',
            to: req.body.email, // list of receivers
            subject: '360OZ 3 day challenge plan!', // Subject line
            text: 'Hello world?', // plain text body
            html: htmlEmail // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', {msg:'Email has been sent'});
        });

    })
});
module.exports = router;