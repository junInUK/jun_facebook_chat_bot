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

token = "EAArdQlHVItwBANBAgPqiqZAnmsmL32vlsRRUvjo6mpNSKakZC2zSenVIiQWzQE6wZBgWU2jthJw49ocdNwc4myLhZCtMVnGBXdRAWogdcyVssTWZBZAZBR9hpZCZB4luZCZBD8i8XeJZC11EfvHCgaCgZCA9hRCPo82HyRORxcjJqxzT4S6R0O3HRsZCZCZB";

// Facebook
app.get('/webhook', function(req, res){
    console.log("My token:"+req.query['hub.verify_token']);
    if ( req.query['hub.verify_token'] === "EAArdQlHVItwBANBAgPqiqZAnmsmL32vlsRRUvjo6mpNSKakZC2zSenVIiQWzQE6wZBgWU2jthJw49ocdNwc4myLhZCtMVnGBXdRAWogdcyVssTWZBZAZBR9hpZCZB4luZCZBD8i8XeJZC11EfvHCgaCgZCA9hRCPo82HyRORxcjJqxzT4S6R0O3HRsZCZCZB") {
       
        res.send(req.query['hub.challenge'])
    }else{
        res.send("Wrong token");
    }
})

app.post('/webhook', function(req, res){
    let messaging_events = req.body.entry[0].messaging_events;
    for(let i = 0; i<messaging_events.length; i++){
        let event = messaging_events[i];
        let sender = event.sender.id;
        if(event.message && event.message.text){
            let text = event.message.text;
            sendText(sender, "Text echo:" + text.substring(0, 100));
        }
    }
    res.sendStatus(200);
})

function sendText(sender, text){
    let messageData = {text; text};
    request({
        url: "https://www.facebook.com/Hansson-atlantic-1537779486504379",
        qs: {access_token, token},
        method: "POST",
        json:{
            receipt: {id: sender},
            message: messageData
        }
    }, function(error, response, body){
        if(error){
            console.log("sending error");
        }else if(response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'), function(){
    console.log("running: port");
})

