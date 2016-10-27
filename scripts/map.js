var map,
    style = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#dfdbdb"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#eff0f2"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]}];

var datas = [{name : "thomas", lat : 12.6598, lng :14.655, tweets : ["hey","yo","damn"]}];
var panelElement = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: {lat: 32.166313, lng: 4.042969},
        zoom: 3,
        styles : style,
        disableDefaultUI: true
    });
    readFile('template/panel.html');
}

function hideMarker(markerTab){
    for(var i = 0; i < markerTab.length; i++){
        markerTab[i].setMap(null);
    }
}

function addElement(infos){
    var marker = createMarker(infos);
    var info = createInfoWindow(infos);
    marker.setMap(map);
    marker.addListener('click', function() {
        info.open(map, marker);
    });
}

function createMarker(infos){
    var colors = ['#e5118e', '#39dad0', '#f4bb4c', '#7164f0'];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    return new google.maps.Marker({
        position: new google.maps.LatLng(infos.lat,infos.lng),
        title: infos.name,
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
}

function createInfoWindow(infos){
    var templateVars = {
        name: infos.name,
        tweet1: infos.tweets[0],
        tweet2: infos.tweets[1],
        tweet3: infos.tweets[2],
    };

    var content = panelElement.replace(/name|tweet1|tweet2|tweet3/gi, function(matched){
        return templateVars[matched];
    }).split('{{').join('').split('}}').join('');

    return new google.maps.InfoWindow({content: content});
}

function readFile(file){
    var rawFile = new XMLHttpRequest(),
    response = false;
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState == 4){
            panelElement = rawFile.responseText;
        }
    };
    rawFile.send(null);
}
