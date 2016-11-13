/* Changement design followers-followings */

function translate(El) {
  var checkbox = document.getElementsByClassName("colorful-switch__checkbox")[0];
  if(checkbox.checked == true) {
    var deplacement = "translateX(" + El.offsetWidth*2/3 + "px)";
    El.style.transform = deplacement;
    El.style.transition = "transform 0.5s";
  } else {
    El.style.transform = "translateX(0px)";
    El.style.transition = "transform 0.5s";
  }
}

document.getElementsByClassName("colorful-switch__checkbox")[0].addEventListener('click', changeColor = function() {
    translate(document.getElementsByClassName("navbar_pp-twitter_bg")[0])
    translate(document.getElementsByClassName("colorful-switch__bg")[0])
    translate(document.getElementsByClassName("logo_bg")[0])
}, false);
