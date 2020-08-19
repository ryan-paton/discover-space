/*
space.js

Script for accessing NASA APIs

Ryan Paton
2020-08-19
*/

function convertDate(longDate) {
    // converts date from YYYY-MM-DD format to YYMMDD
    var result = longDate.replace(/-/g, "");
    result = result.slice(2);
    return result;
}

function receiveAPOD(responseText) {
    // Handles the response from the Astronomy picture of the day API
    var response = JSON.parse(responseText);
    var linkString = "https://apod.nasa.gov/apod/ap";
    
    document.getElementById("apodImg").src = response.url;
    document.getElementById("apodInfo").innerHTML = response.title;
    
    // Build link to Astronomy picture of the day website
    var date = convertDate(response.date);
    linkString += date + ".html";
    document.getElementById("apodLink").href = linkString;
}

function responseHandler() {
    receiveAPOD(this.responseText);
}

function requestAPOD() {
    // Sends a GET request for the astronomy picture of the day
    // Currently requests yesterdays date as New Zealand is a day ahead
    var requestURL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    requestURL += "&date=2020-08-18";
    var request = new XMLHttpRequest();
    
    request.addEventListener("load", responseHandler);
    request.open("GET", requestURL);
    request.send();
}

function init() {
    requestAPOD();
}

// Initialise the page once it's loaded
window.addEventListener("load", init);
