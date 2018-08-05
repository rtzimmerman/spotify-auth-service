var express = require('express');
const axios = require('axios');
const querystring = require('querystring');
var app = express();

let AUTH_TOKEN = process.env.AUTH_TOKEN;

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
          'Authorization': 'Basic ' + AUTH_TOKEN,
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
            console.log(error);
            res.sendStatus(500);
        });
});
 
app.listen(process.env.PORT || 5000);