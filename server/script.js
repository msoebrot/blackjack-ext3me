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
let data = [];

//Function to start a game
app.get("/start/:username", (req, res) => {
    let username = req.params['username'];
    console.log('start');
    console.log(username);
    dealer_total = 0;
    player_total = 0;
    
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
                data.push({'id': deckid});
                data.push({'remaining': remaining_cards})

                let cards = [];
                for(let i = 0; i < 4; i++) {
                    let card = startbody.cards[i];
                    let value = card.value;
                    let image = card.image;
                    cards.push({"value": value, "image": image});
                }
                player_cards.push(cards[0]);
                dealer_cards.push(cards[1]);
                player_cards.push(cards[2]);
                dealer_cards.push(cards[3]);

                console.log(cards);
                console.log(dealer_cards);
                console.log(player_cards);
                console.log(data)
                res.send(data);
            });
        });
    }
    else {
        let starturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`;
        //console.log(starturl)
        request(starturl, (error, response, body)=>{
            if(error) console.log(error)
	   
		    // Printing status code
		    //console.log(response.statusCode);

            //console.log(body);

            body = JSON.parse(body);
            deckid = body.deck_id;
            remaining_cards = body.remaining;
            //console.log(deckid);
            //console.log(remaining_cards);
        });
    }
    
});

//Function to hit
app.get("/hit/:username", (req, res) => {
    let username = req.params['username'];
    console.log('hit');
    console.log(username);
    //draw a card
    let hiturl = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`;
    console.log(hiturl)
    request(hiturl, (error, response, body)=>{
        if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);

        console.log(body);

        body = JSON.parse(body);
        deckid = body.deck_id;
        remaining_cards = body.remaining;
        console.log(deckid);
        console.log(remaining_cards);
    });

});

//Function to stay
app.get("/stand/:username", (req, res) => {
    let username = req.params['username'];
    console.log('stand');
    console.log(username);
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