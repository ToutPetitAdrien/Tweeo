document.getElementsByClassName("register__form")[0].addEventListener('submit', displayLogIn, false);

function displayLogIn(evt){
    evt.preventDefault();
    if(document.getElementsByClassName('form_visitor-name')[0].value){
        document.getElementsByClassName("register__form")[0].style.display="none";
        document.getElementsByClassName("presentation")[0].style.display="block";
        document.getElementsByClassName('presentation_text_visitor-name')[0].innerHTML = document.getElementsByClassName('form_visitor-name')[0].value;
        document.getElementsByClassName("presentation")[0].style.visibility="visible";
        document.getElementsByClassName('presentation_text_visitor-name')[0].innerHTML = document.getElementsByClassName('form_visitor-name')[0].value;
    }
}
