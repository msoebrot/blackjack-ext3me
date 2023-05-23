//Temporary test for server functionality
let username = "bill"
const xhr = new XMLHttpRequest(); //Defines xmlhttp objject
xhr.open("GET", `http://localhost:3000/start/${username}`); // request to the website
xhr.send(); //sends the request