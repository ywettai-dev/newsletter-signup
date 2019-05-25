//jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const request = require('request');

//Express server
app.listen(port, () => console.log(`News-letter signup starts on ${port}`));

app.use(bodyParser.urlencoded({extended: true}));