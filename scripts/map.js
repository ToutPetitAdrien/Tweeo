/* jshint esversion:6 */

/*
    Global vars
*/
var map,
    bounds,
    spiderfy,
    panelElement,
    ib,
    style = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#dfdbdb"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#eff0f2"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]}];


/*
    ** Init Map function **
    PARAMS : no params
    PROCESS :
    - Callback of Google Maps loading
    - Create new google.maps.Map object
    - Create new LatLngBounds object
    - Create nex Spiderfy
    - Call getPanelElement function
*/
function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: {lat: 32.166313, lng: 4.042969},
        zoom: 3,
        styles : style,
        disableDefaultUI: true
    });
    bounds = new google.maps.LatLngBounds();
    createSpiderfy();
    getPanelElement();
}
initMap();
/*
    ** Create InfoWindow function **
    PARAMS :
    - User informations object (user)
    PROCESS :
    - Return InfoBubble object with panel template
*/
function createSpiderfy(user){
    spiderfy = new OverlappingMarkerSpiderfier(map, {legWeight : 0.5});
    ib = new InfoBubble({
        padding : 0,
        shadowStyle : 0,
        borderWidth : 0,
        maxHeight: null,
        maxWidth : null,
        borderRadius: 0,
        arrowSize: 0,
        hideCloseButton: true,
    });
    spiderfy.addListener('click', function(marker, event) {
      ib.setContent(marker.desc);
      ib.open(map, marker);
    });
    google.maps.event.addListener(map, 'click', function(e) {
        ib.close();
    });
}

/*
    ** Display markers function **
    PARAMS :
    - Tab of marker (markerTab)
    PROCESS :
    - Create google.maps.LatLngBounds obejct to fit map to markers
    - Iter on each marker
    - Extend the bounds and display the marker on map
    - Finaly fit the map to markers
*/
function displayMarkers(markerTab){
    for (var i = 0; i < markerTab.length; i++) {
        bounds.extend(markerTab[i].getPosition());
        markerTab[i].setMap(map);
    }
    map.fitBounds(bounds);
}

/*
    ** Hide markers function **
    PARAMS :
    - Tab of marker (markerTab)
    PROCESS :
    - Iter on each marker
    - hide the marker => setMap(null)
*/
function hideMarkers(markerTab){
    for(var i = 0; i < markerTab.length; i++){
        markerTab[i].setMap(null);
    }
}

/*
    ** Add user on map function **
    PARAMS :
    - User object (user)
    - Boolean used in app.js/createMarkersFromUsers (display)
    - Callback function (callback)
    PROCESS :
    - Check if user object has location informations
    - Call Google Geocoding API with the user's location
    - Collect lat lng form the response
    - Call createMarker, createInfoWindow
    - Callback - add the marker in the specific marker tab
    - If display call displayMarkers
*/
function addUserOnMap(user, display, callback){
    if(!user.location)
    return;

    var request = new XMLHttpRequest();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + user.location + '&key=AIzaSyBFO6THo29ll-W20yu1KmK--gpddIYJxFs';
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var geocoding = JSON.parse(request.responseText);
            if(geocoding.status == "OK"){
                var lat = geocoding.results[0].geometry.location.lat;
                var lng = geocoding.results[0].geometry.location.lng;
                var marker = createMarker(lat, lng, user, display);
                spiderfy.addMarker(marker);
                // var infob = createInfoWindow(user);
                // marker.addListener('click', function() {
                //     ibs.forEach(function(ib){
                //         ib.close();
                //     });
                //     infob.open(map, marker);
                // });
                callback(marker);
            }

        }
    };

    request.onerror = function() {
        //
    };
    request.send();
}

/*
    ** Create marker function **
    PARAMS :
    - Latitude (lat)
    - Longitude (lng)
    PROCESS :
    - Get random color
    - return google.maps.Marker object
*/
function createMarker(lat, lng, user, display){
    var colors = ['#e5118e', '#39dad0', '#f4bb4c', '#7164f0'];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        icon : {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor : randomColor,
            fillOpacity : 1,
            strokeWeight : 10,
            strokeColor : randomColor,
            strokeOpacity : 0.2
        },
        animation: google.maps.Animation.DROP
    });
    marker.desc = getMarkerDescription(user);

    if(display){
        marker.setMap(map);
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
    }
    return marker;
}

/*
    ** Get marker description function **
    PARAMS :
    - User informations object (user)
    PROCESS :
    - Replace template vars by correct informations in panelElement
    - Return the string
*/
function getMarkerDescription(user){
    var templateVars = {
        coverimage : user.profile_background_image_url,
        profilePicture : user.profile_image_url,
        username: user.screen_name,
        tweetCount : user.statuses_count,
        followersCount :  user.followers_count,
        followingsCount : user.friends_count,
        tweet_text: user.status.text,
        linkTo : user.url
    };
    var regexp = /coverimage|profilePicture|username|tweetCount|followersCount|followingsCount|tweet_text|linkTo/gi;
    var content = panelElement.replace(regexp, function(matched){
        return templateVars[matched];
    }).split('{{').join('').split('}}').join('');

    return content;
}

/*
    ** Get panel element function **
    PARAMS :
    - HTML file which contain the panel template (file)
    PROCESS :
    - Make XMLHttp Request
    - Get content of template/panel.html
*/
function getPanelElement(){
    var rawFile = new XMLHttpRequest(),
    response = false;
    rawFile.open("GET",'template/panel.html', true);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState == 4){
            panelElement = rawFile.responseText;
        }
    };
    rawFile.send(null);
}
