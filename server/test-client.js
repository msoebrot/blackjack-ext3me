//Temporary test for server functionality
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let username = "bill";
let xhr = new XMLHttpRequest(); //Defines xmlhttp objject
xhr.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr.send(); //sends the request