'use strict';
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');

mongoose.connect(config.mongo.url, {useNewUrlParser: true});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set path url doubt
app.set('appPath', __dirname + '/..');

require('./router/router')(app);

var port = process.env.PORT || 9000;

app.listen(9000,()=>{
    console.log(`Running on location:${port}`);
});



