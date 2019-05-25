//jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const request = require('request');

//Express static, public
app.use(express.static('public/'));

//Express server
app.listen(process.env.PORT || port, () => console.log(`Newsletter starts on ${port}`));

app.use(bodyParser.urlencoded({
    extended: true
}));

//Signup Home
app.get('/', (req, res) => res.sendFile(__dirname + `/signup.html`));

app.post('/', function (req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    //Anystring(username), API key
    var username = 'ywettai';
    var api = 'ea68a913457fe64382795bd56b87c663-us20';

    var data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/59d2f5519b',
        method: 'POST',
        headers: {
            'Authorization': `${username} ${api}`
        },
        body: jsonData
    };

    request(options, function (error, response, body) {

        if (error) {

            res.sendFile(__dirname + `/failure.html`);

        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + `/success.html`);
            } else {
                res.sendFile(__dirname + `/failure.html`);
            }
        }

    });

});

//Failure Redirect
app.post('/failure', (req, res) => res.redirect('/'));