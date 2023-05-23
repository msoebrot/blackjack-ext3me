//Temporary test for server functionality
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let username = "bill";

let xhr = new XMLHttpRequest(); //Defines xmlhttp objject
xhr.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr.send(); //sends the request

/*
let xhr2 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr2.open("GET", `http://localhost:3000/hit/${username}`); // request to the website
xhr2.send(); //sends the request

let xhr3 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr3.open("GET", `http://localhost:3000/stand/${username}`); // request to the website
xhr3.send(); //sends the request

let xhr4 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr4.open("GET", `http://localhost:3000/balance/${username}`); // request to the website
xhr4.send(); //sends the request
*/