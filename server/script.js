//WEBSITE SERVER

const express = require('express');
const request = require("request");

const app = express();

const cors = require('cors');
app.use(cors());

//Variable where we save the deckid for the current game
let deckid = '';
let remaining_cards = -1;
let dealer_total = -1;
let player_total = -1;
let dealer_cards = [];
let player_cards = [];
let cards = [];
let data = new Object();
let face = ['KING', 'QUEEN', 'JACK'];
let bet = 0;
let name = "";

// username dictionary
let userDict = {'username1' : 5000, 'username2' : 500, 'username_3' : 500};

// password dictionary tied to username
let passwordDict = {'username1' : 'bill420', 'username 2' : 'emily21', 'username_3' : 'blues_clues'};

// adds a valid (not used) username to dictionary 
function valid_username(username) {
    // alerts if username exists
    if(validateUsername(username)) {
        if (username in userDict){ 
            // adds username to dictionary 
            console.log(userDict[username]);
            return userDict[username]; 
        }
        else {
            userDict[username] = 500; // gives user a starter balance 
            console.log(userDict[username]);
            return userDict[username]; 
        }
    }
    return -1;
    
}    

// adds a character limit for username
function validateUsername (username) {
    let alphanumericRegex = /^[a-zA-Z0-9_]+$/;
    return alphanumericRegex.test(username) && username.length >= 2 && username.length <=10;  
}

// adds password to username 
function checkPassword(username, password) {
    let character = "0123456789abcdefghijklmnopqerstuvwxyz!@#$%^&*()_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12; 
    if(username in passwordDict) {
        return password == passwordDict[username];
    }
    else {
        if(passwordLength <= 12) {
            let char = ' ';
            for(let i = 0; i < password.length; i++) {
                char = password.charAt(i)
                if(character.includes(char) == false) {
                    return false;
                }
            }
            passwordDict[username] = password;
            return true;
        }
        return false;
    }
}

// adds a "base" balance to user if username does NOT exist  
function update_balance ( username, bet_amount ) {
    let current_balance = valid_username(username);
    userDict[username] = Number(current_balance) + Number(bet_amount);
    return userDict[username];
}


function add_value(cardlist, cardvalue) {
    if(face.includes(cardvalue)) {
        return cardlist + 10;
    }
    else if (cardvalue == 'ACE') {
        return cardlist + 11;
    }
    return cardlist + Number(cardvalue);
}

function empty_list(list) {
    while(list.length > 0) {
        list.pop();
    }
}

function has_ace(hand) {
    for(let i = 0; i < hand.length; i++) {
        if(hand[i].value == "ACE") {
            return true;
        }
    }
    return false;
}

//Function to start a game
app.get("/start/:username/:bet", (req, res) => {
    let username = req.params['username'];
    bet = req.params['bet'];
    console.log('start');
    console.log(username);
    dealer_total = 0;
    player_total = 0;
    empty_list(dealer_cards);
    empty_list(player_cards);
    empty_list(cards);
    lost = false;
    
    if(remaining_cards < 60) {
        //create a deck
        let deckurl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
        request(deckurl, (error, response, body)=>{
            // Printing the error if occurred
		    if(error) console.log(error)
	   
		    // Printing status code
		    console.log(response.statusCode);

            deckbody = JSON.parse(body);
            deckid = deckbody.deck_id;
            remaining_cards = deckbody.remaining;

            let starturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
            request(starturl, (error, response, body)=>{
                if(error) console.log(error)
	   
		        // Printing status code
		        console.log(response.statusCode);

                startbody = JSON.parse(body);
                deckid = startbody.deck_id;
                remaining_cards = startbody.remaining;
                data.id = deckid;
                data.remaining = remaining_cards;

                for(let i = 0; i < 4; i++) {
                    let card = startbody.cards[i];
                    let value = card.value;
                    let image = card.image;
                    cards.push({"value": value, "image": image});
                }
                player_cards.push(cards[0]);
                player_total = add_value(player_total, cards[0].value);

                dealer_cards.push(cards[1]);
                dealer_total = add_value(dealer_total, cards[1].value);

                player_cards.push(cards[2]);
                player_total = add_value(player_total, cards[2].value);

                data.dealer_cards = dealer_cards;
                data.player_cards = player_cards;
                data.player_total = player_total;
                data.dealer_total = dealer_total;
                data.win = 3;
                
                res.send(data);

                dealer_cards.push(cards[3]);
                dealer_total = add_value(dealer_total, cards[3].value);
            });
        });
    }
    else {
        let starturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
        request(starturl, (error, response, body)=>{
            if(error) console.log(error)
	   
		    // Printing status code
		    console.log(response.statusCode);

            startbody = JSON.parse(body);
            deckid = startbody.deck_id;
            remaining_cards = startbody.remaining;
            data.id = deckid;
            data.remaining = remaining_cards;

            for(let i = 0; i < 4; i++) {
                let card = startbody.cards[i];
                let value = card.value;
                let image = card.image;
                cards.push({"value": value, "image": image});
            }
            player_cards.push(cards[0]);
            player_total = add_value(player_total, cards[0].value);

            dealer_cards.push(cards[1]);
            dealer_total = add_value(dealer_total, cards[1].value);

            player_cards.push(cards[2]);
            player_total = add_value(player_total, cards[2].value);

            data.dealer_cards = dealer_cards;
            data.player_cards = player_cards;
            data.player_total = player_total;
            data.dealer_total = dealer_total;
            data.win = 3;

            res.send(data);

            dealer_cards.push(cards[3]);
            dealer_total = add_value(dealer_total, cards[3].value);

        });
    }
    
});

//Function to hit
app.get("/hit/:username", (req, res) => {
    let username = req.params['username'];
    console.log('hit');
    console.log(username);
    //draw a card
    let hiturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`;
    //console.log(hiturl)
    request(hiturl, (error, response, body)=>{
        if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);

        //console.log(body);

        let hitbody = JSON.parse(body);
        deckid = hitbody.deck_id;
        remaining_cards = hitbody.remaining;
        data.id = deckid;
        data.remaining = remaining_cards;

        let card = hitbody.cards[0];
        let value = card.value;
        let image = card.image;
        player_cards.push({"value": value, "image": image});
        player_total = add_value(player_total, value);
        data.win = 3
        if(player_total > 21 && has_ace(player_cards)) {
            player_total = player_total - 10
        }
        else if(player_total > 21){
            data.win = 0;
            update_balance(username, (-1 * bet));
            bet = 0;
        }
        data.dealer_cards = [dealer_cards[0]];
        if(data.win == 0) {
            data.dealer_cards = dealer_cards;
        }
        data.player_cards = player_cards;
        data.player_total = player_total;
        data.dealer_total = dealer_total;
        data.balance = userDict[username];
        res.send(data);
    });

});

//Function to stay
app.get("/stand/:username", (req, res) => {
    let username = req.params['username'];
    console.log('stand');
    console.log(username);
    
    let standurl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=20`;
    request(standurl, (error, response, body)=>{
        if(error) console.log(error);

        console.log(response.statusCode);

        let standbody = JSON.parse(body);
        deckid = standbody.deck_id;
        remaining_cards = standbody.remaining;
        data.id = deckid;
        data.remaining = remaining_cards;
        let i = 0;

        while(dealer_total <= player_total && dealer_total < 17 && player_total <= 21)
        {
            let card = standbody.cards[i];
            let value = card.value;
            let image = card.image;

            dealer_cards.push({"value": value, "image": image});
            dealer_total = add_value(dealer_total, value);
            
            if(dealer_total > 21 && has_ace(dealer_cards)) {
                dealer_total = dealer_total - 10
            }
            i++;
        }
        data.dealer_cards = dealer_cards;
        data.player_cards = player_cards;
        data.player_total = player_total;
        data.dealer_total = dealer_total;

        if((player_total > dealer_total || dealer_total > 21) && player_total <= 21)
        {
            data.win = 1
            update_balance(username, bet);
        }
        else if(player_total == dealer_total && player_total <= 21) {
            data.win = 2 //nothing happens
        }
        else {
            data.win = 0
            update_balance(username, (-1 * bet));
        }
        bet = 0;
        //send the balance
        data.balance = userDict[username];
        res.send(data);
        
    })
    
});

//Function to update balance
app.get("/validate/:username/:password", (req, res) => {
    let username = req.params['username'];
    let password = req.params['password'];
    name = username;
    console.log('validate');
    console.log(username);
    console.log(password)
    let user = new Object();
    user.username = username;
    user.password = password;
    
    user.balance = valid_username(username)
    user.validUser = true;
    if(user.balance == -1 || checkPassword(username, password) == false) {
        user.validUser = false;
        user.balance = -1;
    }
    res.send(user)
});

app.get("/getUser", (req, res) => {
    let body = new Object();
    body.name = name;
    body.bal = userDict[name];
    res.send(body)
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!'); //Go to http://localhost:3000/');
});

