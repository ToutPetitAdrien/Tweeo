/* jshint esversion:6 */

/*
    Global vars
*/
var client = null, user_infos = {}, markers = { followers : [], followings : [] };

/*
    Event listener for Twitter Oauth
*/
document.getElementById('log-with-twitter').addEventListener('click', twitterOauth);

/*
    ** Twitter Oauth function **
    PARAMS : no params
    PROCESS :
    - Call logWithTwitter from main.js
    - Collect access tokens
    - Call twitterClient
*/
function twitterOauth(){
    var electron = require('electron');
    var request = electron.remote.require('./main').logWithTwitter();
    var access = null;

    request.then(function(result){
        const accessToken = result.oauth_access_token;
        const accessTokenSecret = result.oauth_access_token_secret;
        access = [accessToken, accessTokenSecret];
        twitterClient(access);
    }).catch(function(error){
        console.error(error, error.stack);
    });
}

/*
    ** Twitter Client function **
    PARAMS :
    - Access tokens (access)
    PROCESS :
    - Create client needed for API call
    - Use twitter package and access tokens collect previously
    - Finaly collect the current user informations
*/
function twitterClient(access){
    var Twitter = require('twitter'),
        key = access[0],
        secret = access[1];

    client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: key,
        access_token_secret: secret
    });

    client.get('account/verify_credentials', {}, function(error, response) {
        if (!error) {
            user_infos = response;
            updateViewLogin(user_infos);
            getFollowersFollowings(user_infos.id);
        }else{
            console.log(error);
        }
    });
}

/*
    ** Get followers and followings function **
    PARAMS :
    - Current user ID (user_id)
    PROCESS :
    - Use client previously created to call the api
    - Call 'followers/list' and 'friends/list' (SEE DOC)
    - Call createMarkersFromUsers with each response
*/
function getFollowersFollowings(user_id){
    var params = {user_id : user_id, count : 100};
    client.get('followers/list', params , function(error, response) {
        if (!error){
            createMarkersFromUsers(response.users, 'followers', false);
        }
    });
    client.get('friends/list', params, function(error, response) {
        if (!error){
            createMarkersFromUsers(response.users, 'followings', true);
        }
    });
}

/*
    ** Create user marker function **
    PARAMS :
    - Tab of user (userTab)
    - Specific key for marker tab (markerTab) followers or followings
    - Boolean for display this marker (display). By default start with displaying followings
    PROCESS :
    - Iter on each user
    - Call map.jsaddUserOnMap with callback => add marker the Specific tab of marker
*/
function createMarkersFromUsers(userTab, markerTab, display){
    for(var i=0 ; i< userTab.length; i++){

        addUserOnMap(users[i], display, function(marker){
            markers[markerTab].push(marker);
        });
    }
}

/*
    ** Display header function **
    PARAMS :
    - Current user informations
    PROCESS :
    - Hide register page
    - Display navbar with picture and screen name
*/
function updateViewLogin(user_infos){
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.navbar').style.display = 'flex';
    document.querySelector('.navbar #profile-picture').src = user_infos.profile_image_url;
    document.querySelector('.navbar #username').innerHTML = "@"+user_infos.screen_name;
}
