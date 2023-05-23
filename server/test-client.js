//Temporary test for server functionality
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let username = "bill";

let xhr = new XMLHttpRequest(); //Defines xmlhttp objject
xhr.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr.send(); //sends the request
console.log('output');
xhr.onload = function() {
    let startbody = JSON.parse(xhr.responseText);
    console.log(startbody);
    /*
    console.log(startbody.id);
    console.log(startbody.remaining);
    console.log(startbody.dealer_cards);
    console.log(startbody.player_cards);
    */

    let xhr2 = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr2.open("GET", `http://localhost:3000/hit/${username}`); // request to the website
    xhr2.send(); //sends the request
    xhr2.onload = function() {
        let hitbody = JSON.parse(xhr2.responseText);
        console.log(hitbody);
        /*
        console.log(hitbody.id);
        console.log(hitbody.remaining);
        console.log(hitbody.dealer_cards);
        console.log(hitbody.player_cards);
        */
    }
}

/*
let xhr3 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr3.open("GET", `http://localhost:3000/stand/${username}`); // request to the website
xhr3.send(); //sends the request

let xhr4 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr4.open("GET", `http://localhost:3000/balance/${username}`); // request to the website
xhr4.send(); //sends the request
*/