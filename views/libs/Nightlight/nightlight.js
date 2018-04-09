
//set up a style element in the document
var style = document.createElement('style');

//set the background and text colors based on the cookie
if(getCookie('nightlight') === 'light'){

    document.getElementById("nightlight").innerHTML = "Light";
    style.innerHTML = "body { background-color: #222222; color: #ffffff; }";
    document.head.appendChild(style);

}else{

    document.getElementById("nightlight").innerHTML = "Dark";
    style.innerHTML = "body { background-color: #ffffff; color: #000000; }";
    document.head.appendChild(style);

}

//cookie methods, from https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}