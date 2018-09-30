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
        // console.log(day1message);
        const htmlEmail = `
      <ul>
            <li>Hello and welcome to 360Oz!</li>
            <li>You have successfully generated your 3 Day Plan. Below are the details for your plan:</li>
      </ul>
            <h3>Day 1: ARRIVE</h3>
      <ul>
            <li>${JSON.stringify(req.body.day1message)}</li>
      </ul>

            <h3>Day 2: REVIVE</h3>

      <ul>
            <li>${JSON.stringify(req.body.day2message)}</li>
      </ul>

            <h3>Day 3: IMMERSE</h3>

      <ul>
            <li>${JSON.stringify(req.body.day3message)}</li>
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