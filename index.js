var express = require('express');
var request = require("request");
const axios = require('axios');
const querystring = require('querystring');
var app = express();
//AQCQuPqcWt3Hbe1WNo8rocuAJzsUmzR5cO7P1TghlQiMGJheNg1BEod8X1Va46_0Ppf8MER5xmLm0x7jECHzfnrnBMqZM8P1rr7CUwiVmg3320If41SZnV-oC6XAPpSdGCI
let refreshToken;
app.get('/refresh', function (req, res) {
    if(req.query.refresh_token){
        refreshToken = req.query.refresh_token;
    }
    else{
        res.status(400);
    }

    var data = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    };
    let params = querystring.stringify(data);
 
    var config = {
        headers: {
          'Authorization': 'Basic NjFiMjNjNGQwYWQ1NDFiYWE3MmYxZjRhYmVmNjhlNzE6MDBjYmEyZjg3MjUwNDU1OGJiNTkwZTViYjZhNGNmZTc=',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    axios
        .post('https://accounts.spotify.com/api/token', params, config)
        .then((response) => {
            console.log(response.data);
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.send(response.data)
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});
 
app.listen(3002);