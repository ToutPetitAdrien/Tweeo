document.getElementsByClassName("form_btn")[0].addEventListener('click', change = function() {
    if(document.getElementsByClassName('form_visitor-name')[0].value){

        document.getElementsByClassName("presentation")[0].style.visibility="hidden";
        document.getElementsByClassName('presentation_text_visitor-name')[0].innerHTML = document.getElementsByClassName('form_visitor-name')[0].value
        document.getElementsByClassName("presentation")[0].style.visibility="visible";
        document.getElementsByClassName('presentation_text_visitor-name')[0].innerHTML = document.getElementsByClassName('form_visitor-name')[0].value
        
  }
},false)
