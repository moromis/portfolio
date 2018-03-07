//set up a style element in the document
var style = document.createElement('style');

//set the background and text colors based on the cookie
if(getCookie('nightlight') === "dark"){
    style.innerHTML = "body { background-color: #222222; color: #ffffff; }";
    document.head.appendChild(style);
}else{
    style.innerHTML = "body { background-color: #ffffff; color: #000000; }";
    document.head.appendChild(style);
}

//get cookie method, from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}