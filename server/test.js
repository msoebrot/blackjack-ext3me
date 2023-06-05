//Temporary test for server functionality
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let username = "bill";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let xhr_start = new XMLHttpRequest(); //Defines xmlhttp objject
xhr_start.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr_start.send(); //sends the request
console.log('output');
xhr_start.onreadystatechange = function() {
    

    if(xhr_start.readyState == 4 && xhr_start.status == 200)
    {
        let startbody = JSON.parse(xhr_start.responseText);
        console.log(startbody);

        let xhr = [];
        let count = 0;
        let wait = 1;
        let hitbody = new Object();
        let hit = true;
        while(hit == true)
        {
            sleep(5000);
            console.log('hello')
            xhr[count] = new XMLHttpRequest();
            xhr[count].open("GET", `http://localhost:3000/hit/${username}`);
            xhr[count].send();
            xhr[count].onload = function(){
                print('here')
                hitbody = JSON.parse(xhr[count].responseText);
                console.log(hitbody)
                count++;
                if(count == 2) {
                    hit = false
                }
            }
            
            wait++;
        }
        
    }

}