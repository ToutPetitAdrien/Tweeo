/* jshint esversion:6 */

document.getElementById('log-with-twitter').addEventListener('click', twitterOauth);

/*
    twitterOauth -> twitterClient -> getDatas -> displayDatas
*/
var client = null, user_infos = {}, followers =[], followings = [];

function twitterOauth(){
    var electron = require('electron');
    var logWithTwitter = electron.remote.require('./main').logWithTwitter();
    var access = null;

    logWithTwitter.then(function(result){
        const accessToken = result.oauth_access_token;
        const accessTokenSecret = result.oauth_access_token_secret;
        access = [accessToken, accessTokenSecret];
        //twitter client
        twitterClient(access);
    }).catch(function(error){
        console.error(error, error.stack);
    });
}

function twitterClient(access){
    var Twitter = require('twitter'),
        at_key = access[0],
        at_secret = access[1];

    client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: at_key,
        access_token_secret: at_secret
    });

    client.get('account/verify_credentials', {}, function(error, response) {
        if (!error) {
            user_infos = response;
            displayHeader(user_infos);
            getDatas(user_infos.id);
        }else{
            console.log(error);
        }
    });
}

function getDatas(user_id){
    var params = {user_id : user_id, count : 100};
    client.get('followers/list', params , function(error, response) {
        if (!error) {
            // console.log(response.users);
            followers = cleanArrayUsers(response.users);
        }else{
            console.log(error);
        }
    });
    client.get('friends/list', params, function(error, response) {
        if (!error) {
            console.log(response.users)
            followings = cleanArrayUsers(response.users);
        }else{
            console.log(error);
        }
    });
}

function cleanArrayUsers(users){
     return null;
}

function displayHeader(user_infos){
    document.querySelector('#log-with-twitter').style.display = 'none';
    document.querySelector('header').style.display = 'flex';
    document.querySelector('header img').src = user_infos.profile_image_url;
    document.querySelector('header .username').innerHTML = "@"+user_infos.screen_name;
}