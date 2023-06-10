let bet = 0;
let validUsername = false;
let validBet = false;
let started = false;
let user = "username0";

let xhr_user = new XMLHttpRequest();
xhr_user.open("GET", `http://localhost:3000/getUser/`); // request to the website
xhr_user.send(); //sends the request
xhr_user.onload = function() {
    body = JSON.parse(xhr_user.responseText);
    user = body.name;
    bal = body.bal;
    //console.log(user);
    //console.log(bal);
    document.getElementById('name').innerHTML = user;
    document.getElementById('balance').innerHTML = bal;
}


function getBet() {
    console.log("getBet"); 
    let pool = Number(pot.value);
    console.log(pool)
    if(started === false && pool > 0 || pool === bet) {
        if(pool > bal || pool <= 0)
        {
            alert('Invalid bet');
        }
        else {
            validBet = true;
            bet = pool;
        }
    }
    else {
        validBet = false;
    }
    console.log(started)
}

function returnToLogin() {
    location.replace("https://msoebrot.github.io/blackjack-ext3me/index.html");
}

document.getElementById('name').addEventListener("click", returnToLogin);

// Add event listeners to the buttons
document.getElementById("deal").addEventListener("click", deal);
document.getElementById("buttonadd").addEventListener("click", hit);
document.getElementById("buttonstop").addEventListener("click", stand);

// Function to handle the "Deal" button click
function deal() {
    getBet()
    console.log(validBet);
    console.log(started);
    if(validBet == false || started == true) {
        return;
    }
    console.log('in');
    started = true;
    // TODO: Implement the logic for dealing the cards
    let xhr_start = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr_start.open("GET", `http://localhost:3000/start/${user}/${bet}`); // request to the website
    xhr_start.send(); //sends the request
    xhr_start.onload = function() {
        let startbody = JSON.parse(xhr_start.responseText);
        //console.log(startbody);
        
        let dealer_cards = startbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("cardA");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        for(let i = dealer_cards.length; i < dealerElements.length; i++) {
            dealerElements[i].src = "PNGs/empty.png";
        }
        let user_cards = startbody.player_cards;
        let userElements = document.getElementsByClassName("cardB");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        for(let i = user_cards.length; i < userElements.length; i++) {
            userElements[i].src = "PNGs/empty.png";
        }
    }
    console.log("Deal button clicked");
}

    // Function to handle the "Hit" button click
function hit() {
    console.log(validBet);
    console.log(started);
    if(validBet == false || started == false) {
        return;
    }
    console.log('in')
    // TODO: Implement the logic for hitting (drawing) a card
    let xhr_hit = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr_hit.open("GET", `http://localhost:3000/hit/${user}`); // request to the website
    xhr_hit.send(); //sends the request
    xhr_hit.onload = function() {
        let hitbody = JSON.parse(xhr_hit.responseText);
        let dealer_cards = hitbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("cardA");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        let user_cards = hitbody.player_cards;
        let userElements = document.getElementsByClassName("cardB");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        if(hitbody.win == 0) {
            bal = hitbody.balance;
            document.getElementById('balance').innerHTML = hitbody.balance;
            started = false;
        }

        if(bal <= 0) {
            location.replace("https://msoebrot.github.io/blackjack-ext3me/endscreen.html");
        }
        //console.log(hitbody);
    }
    console.log("Hit button clicked");
}

    // Function to handle the "Stand" button click
function stand() {
    console.log(validBet);
    console.log(started);
    if(validBet == false || started == false) {
        return;
    }
    console.log('in');
    // TODO: Implement the logic for standing (ending the player's turn)
    let xhr_stand = new XMLHttpRequest(); //Defines xmlhttp objject
    xhr_stand.open("GET", `http://localhost:3000/stand/${user}`); // request to the website
    xhr_stand.send(); //sends the request
    xhr_stand.onload = function() {
        let standbody = JSON.parse(xhr_stand.responseText);
        let dealer_cards = standbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("cardA");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        let user_cards = standbody.player_cards;
        let userElements = document.getElementsByClassName("cardB");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        bal = standbody.balance;
        document.getElementById('balance').innerHTML = standbody.balance;
        started = false;
        //console.log(standbody.win)
        //console.log(standbody);
        if(bal <= 0) {
            location.replace("https://msoebrot.github.io/blackjack-ext3me/endscreen.html");
        }
    }
    console.log("Stand button clicked");
}