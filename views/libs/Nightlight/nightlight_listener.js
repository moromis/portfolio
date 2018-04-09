//create an event listener for the element with the id of nightlight
document.getElementById("nightlight").addEventListener("click", function(){

    console.log("this is working");

    //set up a style element to write our changes to
    var sheet = document.createElement('style');

    if(document.cookie.includes("nightlight=light") || document.cookie === "") {

        //change the text of the element that we clicked
        document.getElementById("nightlight").innerHTML = "Light";

        //change the background and text colors of the html
        sheet.innerHTML = "body { background-color: #222222; color: #ffffff; }";
        document.body.appendChild(sheet);

        //set a cookie so we know which mode we're in globally
        document.cookie = "nightlight=dark";

    } else {

        //change the text of the element that we clicked
        document.getElementById("nightlight").innerHTML = "Dark";

        //change the background and text colors of the html
        sheet.innerHTML = "body { background-color: #ffffff; color: #000000; }";
        document.body.appendChild(sheet);

        //set a cookie so we know which mode we're in globally
        document.cookie = "nightlight=light";
    }
});