/* jshint esversion:6 */

$(function(){
    
    $('#log-with-twitter').click(function(e){
        var electron = require('electron');
        electron.remote.require('./main').logWithTwitter();
    });
});
