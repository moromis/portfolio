
//create an event listener for the element with the id of nightlight
document.getElementById("nightlight").addEventListener("click", function(){

    //set up a style element to write our changes to
    var sheet = document.createElement('style');

    if(getCookie('nightlight') === 'dark') {

        //change the text of the element that we clicked
        document.getElementById("nightlight").innerHTML = "Light";

        //change the background and text colors of the html
        sheet.innerHTML = "body { background-color: #222222; color: #ffffff; }";
        document.body.appendChild(sheet);

        //set a cookie so we know which mode we're in globally
        setCookie('nightlight', 'light', 365)

    } else {

        //change the text of the element that we clicked
        document.getElementById("nightlight").innerHTML = "Dark";

        //change the background and text colors of the html
        sheet.innerHTML = "body { background-color: #ffffff; color: #000000; }";
        document.body.appendChild(sheet);

        //set a cookie so we know which mode we're in globally
        setCookie('nightlight', 'dark', 365)
    }
});