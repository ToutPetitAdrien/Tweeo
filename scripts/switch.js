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
    ib.close();
    var isChecked = evt.target.checked;
    var elements = document.querySelectorAll('.gradient-swtich');
    translate(elements, isChecked);

    if(isChecked){
        document.querySelector('body').className = 'followings';
        displayMarkers(markers.followings);
        hideMarkers(markers.followers);
    }else{
        document.querySelector('body').className = 'followers';
        displayMarkers(markers.followers);
        hideMarkers(markers.followings);
    }
}

document.getElementById("switch").addEventListener('click', switch_marker, false);
