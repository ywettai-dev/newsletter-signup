//jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const request = require('request');

//Express static, public
app.use(express.static('public/'));

//Express server
app.listen(port, () => console.log(`News-letter signup starts on ${port}`));

app.use(bodyParser.urlencoded({
    extended: true
}));

//Signup Home
app.get('/', (req, res) => res.sendFile(__dirname + `/signup.html`));

console.log(__dirname + `/signup.html`);