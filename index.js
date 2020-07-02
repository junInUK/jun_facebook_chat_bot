'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  ROUTES

app.get('/', function(req,res) {
    res.send("Hi I am a chatbot")
})

// Facebook
app.get('/webhook', function(req, res){
    console.log("My token:"+req.query['hub.verify_token']);
    if ( req.query['hub.verify_token'] === "EAArdQlHVItwBANBAgPqiqZAnmsmL32vlsRRUvjo6mpNSKakZC2zSenVIiQWzQE6wZBgWU2jthJw49ocdNwc4myLhZCtMVnGBXdRAWogdcyVssTWZBZAZBR9hpZCZB4luZCZBD8i8XeJZC11EfvHCgaCgZCA9hRCPo82HyRORxcjJqxzT4S6R0O3HRsZCZCZB") {
       
        res.send(req.query['hub.challenge'])
    }else{
        res.send("Wrong token");
    }
})

app.listen(app.get('port'), function(){
    console.log("running: port");
})

