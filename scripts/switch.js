/* Changement design followers-followings */

function translate(elements, isChecked) {
    elements.forEach(function(element){
        if(isChecked === true) {
            var deplacement = "translateX(" + element.offsetWidth*2/3 + "px)";
            element.style.transform = deplacement;
            element.style.transition = "transform 0.5s";
        } else {
            element.style.transform = "translateX(0px)";
            element.style.transition = "transform 0.5s";
        }
    });
}

function switch_marker(evt){
    var isChecked = evt.target.checked;
    var elements = document.querySelectorAll('.gradient-swtich');
    translate(elements, isChecked);
    if(isChecked){
        displayMarkers(markers.followings);
        hideMarkers(markers.followers);
    }else{
        displayMarkers(markers.followers);
        hideMarkers(markers.followings);
    }
}

document.getElementById("switch").addEventListener('click', switch_marker, false);
