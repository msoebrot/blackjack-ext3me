//WEBSITE SERVER

const express = require('express');
const request = require("request");

const app = express();

const cors = require('cors');
app.use(cors());

//Variable where we save the deckid for the current game
deckid = 0;

//Function to start a game
app.get("/start/:username", (req, res) => {
    let username = req.params['username'];
    console.log('start');
    console.log(username);
});

//Function to hit
app.get("/hit/:username", (req, res) => {
    let hit = req.params['username'];
    console.log('hit');
    console.log(username);

});

//Function to stay
app.get("/stay/:username", (req, res) => {
    let stay = req.params['username'];
    onsole.log('stay');
    console.log(username);
});

//Function to update balance
app.get("/balance/:username", (req, res) => {
    let balance = req.params['username'];
    onsole.log('balance');
    console.log(username);
});