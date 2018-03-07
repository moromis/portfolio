/*

    Server side code

 */

///////////////////////////////////////////////////////////////////
//////////
//////////              Server setup
//////////
///////////////////////////////////////////////////////////////////

//requires
require('dotenv').config();
var express = require('express'); // Express web server framework
var path = require('path'); // path
var rp = require('request-promise'); // request-promise
var logger = require('js-logging').console(); // logging util

//set up express
var app = express();
app.use('/', express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

///////////////////////////////////////////////////////////////////
//////////
//////////              Endpoints
//////////
///////////////////////////////////////////////////////////////////

//initial landing page, serve the html
app.get('/', function(request, response) {

    response.render('index');

});

//SelfPlay page
app.get('/SelfPlay', function(request, response) {

    response.render('selfplay');

});

//Sudoku Generator page
app.get('/Sudoku', function(request, response) {

    response.render('sudoku');

});

//Pyramid page
app.get('/Pyramid', function(request, response) {

    response.render('pyramid');

});

//Nightlight page
app.get('/Nightlight', function(request, response) {

    response.render('nightlight');

});

//Nightlight page
app.get('/DungeonCrawl', function(request, response) {

    response.render('dungeoncrawl');

});

app.get('/Moromisdotcom', function(request, response) {

    response.render('moromisdotcom');

});

///////////////////////////////////////////////////////////////////
//////////
//////////              Spotify Query Code
//////////
///////////////////////////////////////////////////////////////////

//query necessities
var client_id = process.env.SPOTIFYCLIENTID; // Your client id
var client_secret = process.env.SPOTIFYCLIENTSECRET; // Your secret

var access_token = null;
var refresh_token = process.env.SPOTIFYREFRESHTOKEN;

var return_data = null;
var spotifyIntervalCall = setInterval(callSpotify, 15000);

function callSpotify() {

    logger.debug('/getCurrentlyPlaying');

    var options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: { 'Authorization': 'Bearer ' + access_token },
        redirect_uri: 'redirect_uri',
        json: true
    };

    var refreshOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    logger.debug('sending request for currently playing');
    rp(options)
        .then(function (body){
            if(body !== undefined) {
                return_data = {
                    'link': body.item.external_urls.spotify,
                    'song': body.item.name,
                    'artist': body.item.artists[0].name,
                    'artwork': body.item.album.images[0].url,
                    'status': 'listening'
                };
            }else{
                if(return_data === null) return_data = {};
                return_data.status = 'not listening';
            }
        })
        .catch(function (err){
            console.error(err.status, err.message);
            logger.debug('sending request for refresh');
            rp(refreshOptions)
                .then(function(body){

                    //set the access token locally
                    access_token = body.access_token;

                    options = {
                        url: 'https://api.spotify.com/v1/me/player/currently-playing',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        redirect_uri: 'redirect_uri',
                        json: true
                    };

                    logger.debug('after refresh, getting song');
                    rp(options)
                        .then(function (body){
                            if(body !== undefined) {
                                return_data = {
                                    'link':body.item.external_urls.spotify,
                                    'song': body.item.name,
                                    'artist': body.item.artists[0].name,
                                    'artwork': body.item.album.images[0].url,
                                    'status': 'listening'
                                };
                            }else{
                                if(return_data === null) return_data = {};
                                return_data.status = 'not listening';
                            }
                        })

                })
                .catch(function(err){
                    logger.error(err.status, err.message);
                });
        });
}

app.get('/getCurrentlyPlaying', function(req, res) {
    res.send(return_data);
});

///////////////////////////////////////////////////////////////////
//////////
//////////              Start the server
//////////
///////////////////////////////////////////////////////////////////

var server = app.listen(3000);