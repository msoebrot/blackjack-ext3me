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
let lost = false;

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
            return i;
        }
    }
    return -1;
}

//Function to start a game
app.get("/start/:username", (req, res) => {
    let username = req.params['username'];
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

            //console.log(body);

            deckbody = JSON.parse(body);
            deckid = deckbody.deck_id;
            remaining_cards = deckbody.remaining;

            //console.log(deckid);
            //console.log(remaining_cards);

            let starturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
            //console.log(starturl)
            request(starturl, (error, response, body)=>{
                if(error) console.log(error)
	   
		        // Printing status code
		        //console.log(response.statusCode);

                //console.log(body);

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

                //console.log(cards);
                console.log(dealer_cards);
                console.log(player_cards);
                console.log(player_total);
                console.log(dealer_total);

                data.dealer_cards = dealer_cards;
                data.player_cards = player_cards;
                
                res.send(data);
                //console.log(data)

                dealer_cards.push(cards[3]);
                dealer_total = add_value(dealer_total, cards[3].value);
            });
        });
    }
    else {
        let starturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`;
        //console.log(starturl)
        request(starturl, (error, response, body)=>{
            if(error) console.log(error)
	   
		    // Printing status code
		    //console.log(response.statusCode);

            //console.log(body);

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
            data.action = 'start';

            console.log(dealer_cards);
            console.log(player_cards);
            console.log(player_total);
            console.log(dealer_total);

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
        console.log(deckid);
        console.log(remaining_cards);

        let card = hitbody.cards[0];
        let value = card.value;
        let image = card.image;
        player_cards.push({"value": value, "image": image});
        player_total = add_value(player_total, value);
        data.dealer_cards = [dealer_cards[0]];
        data.player_cards = player_cards;
        data.action = 'hit';
        console.log(dealer_cards);
        console.log(player_cards);
        console.log(player_total);
        console.log(dealer_total);
        res.send(data);
    });

});

//Function to stay
app.get("/stand/:username", (req, res) => {
    let username = req.params['username'];
    console.log('stand');
    console.log(username);
    
    let standurl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`;
    while(dealer_total < player_total || dealer_total < 17) {
        let standbody = new Object();
        let card = new Object();
        let value = 0;
        let image = "";
        request(standurl, (error, response, body)=>{
            if(error) console.log(error);

            console.log(response.statusCode);

            standbody = JSON.parse(body);
            deckid = standbody.deck_id;
            remaining_cards = standbody.remaining;
            data.id = deckid;
            data.remaining = remaining_cards;
            console.log(deckid);
            console.log(remaining_cards);

            card = standbody.cards[0];
            value = card.value;
            image = card.image;
            dealer_cards.push({"value": value, "image": image});
            dealer_total = add_value(dealer_total, value);
            data.dealer_cards = dealer_cards;
            data.player_cards = player_cards;
            data.action = 'stand';
            
        })
    }
    console.log(dealer_cards);
    console.log(player_cards);
    console.log(player_total);
    console.log(dealer_total);
    res.send(data);
});

//Function to update balance
app.get("/balance/:username", (req, res) => {
    let username = req.params['username'];
    console.log('balance');
    console.log(username);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!'); //Go to http://localhost:3000/');
});