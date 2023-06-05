//Temporary test for server functionality
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let username = "bill";

let xhr_hit = []
let bod = new Object();
function hit_me(name, i) {
    console.log('hit')
    xhr_hit[i] = new XMLHttpRequest();
    xhr_hit[i].open("GET", `http://localhost:3000/hit/${name}`); 
    xhr_hit[i].send();
    bod = new Object();
    xhr_hit[i].onload = function () {
        bod = JSON.parse(xhr_hit[i].responseText)
        console.log(bod)
    }
    while(bod == new Object()) {
        continue
    }
    return bod
}

function stand_me(name) {
    let xhr3 = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr3.open("GET", `http://localhost:3000/stand/${name}`); // request to the website
    xhr3.send(); //sends the request
    xhr3.onload = function() {
        console.log('stand');
        let standbody = JSON.parse(xhr3.responseText);
        console.log(standbody);
    }
}

let xhr_start = new XMLHttpRequest(); //Defines xmlhttp objject
xhr_start.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr_start.send(); //sends the request
console.log('output');
xhr_start.onload = function() {
    let startbody = JSON.parse(xhr_start.responseText);
    console.log(startbody);
    /*
    console.log(startbody.id);
    console.log(startbody.remaining);
    console.log(startbody.dealer_cards);
    console.log(startbody.player_cards);
    */

    let hit = true
    let i = 0
    let hitbody = new Object();
    
    while(hit == true)
    {
        hitbody = hit_me(username, i)
        console.log(hitbody)
        i++
        if(i == 2){
            hit = false
        }
    }
    standbody = stand_me(username);

    /*let xhr2 = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr2.open("GET", `http://localhost:3000/hit/${username}`); // request to the website
    xhr2.send(); //sends the request
    xhr2.onload = function() {
        let hitbody = JSON.parse(xhr2.responseText);
        console.log(hitbody);
        console.log(hitbody.id);
        console.log(hitbody.remaining);
        console.log(hitbody.dealer_cards);
        console.log(hitbody.player_cards);
    }
    */
}

/*
let xhr3 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr3.open("GET", `http://localhost:3000/stand/${username}`); // request to the website
xhr3.send(); //sends the request

let xhr4 = new XMLHttpRequest(); //Defines xmlhttp objject
xhr4.open("GET", `http://localhost:3000/balance/${username}`); // request to the website
xhr4.send(); //sends the request
*/