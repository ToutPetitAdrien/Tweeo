var map,
    style = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#dfdbdb"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#eff0f2"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eff0f2"},{"visibility":"on"}]}],
    datas = [
        {
            name : "Thomas",
            lat : 22.502407,
            lng : 19.160156,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Paul",
            lat : 35.951330,
            lng : -91.933594,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Ksos",
            lat : 49.088258,
            lng : 12.480469,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Wang",
            lat : 30.059586,
            lng : 116.191406,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Fred",
            lat : 46.490829,
            lng : 0.878906,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Pablo",
            lat : -19.404430,
            lng : -44.121094,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        },
        {
            name : "Byran",
            lat : 35.951330,
            lng : -116.894531,
            tweets : [
                "Super soirée !",
                "Bon app à tout le monde.",
                "You're so good !"
            ]
        }
    ];

function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: {lat: 32.166313, lng: 4.042969},
        zoom: 3,
        styles : style,
        disableDefaultUI: true
    });
    for(i in datas){
        var marker = createMarker(datas[i]);
        marker.setMap(map);
    }
}

function createMarker(infos){
    var latlng = new google.maps.LatLng(infos.lat,infos.lng);
    var icon = 'img/marker'+ (Math.floor(Math.random() * 3) + 1 )+'.png';
    var marker = new google.maps.Marker({
        position: latlng,
        title: infos.name,
        icon : icon
    });
    var info = createInfoWindow(infos.name, infos.tweets);
    marker.addListener('click', function() {
        info.open(map, marker);
    });
    return marker;
}

function createInfoWindow(name, tweets){
    var element = '<div id="content">'+
        '<h1>'+ name +'</h1>'+
        '<ul>'+
            '<li>' + tweets[0] + '</li>'+
            '<li>' + tweets[1] + '</li>'+
            '<li>' + tweets[2] + '</li>'+
        '</ul>'+
    '</div>';
    return new google.maps.InfoWindow({content: element});
}
