let userSubmit = document.querySelector('.userSubmit');
    let betSubmit = document.querySelector('.betSubmit');
    let bet = 0;
    let validUsername = false;
    let validBet = false;
    let started = false;
    let username = "";

    
    function checkUser() {
      if(started == false) {
        username = userField.value;
        let password = passField.value;
        let xhr_balance = new XMLHttpRequest();
        xhr_balance.open("GET", `http://localhost:3000/validate/${username}/${password}`);
        xhr_balance.send();
        xhr_balance.onload = function (){
          let balancebody = JSON.parse(xhr_balance.responseText);
          if(balancebody.validUser == false) {
            document.getElementById('username').innerHTML = "Invalid username or password";
            validUsername = false;
          }
          else {
            document.getElementById('username').innerHTML = username + '(' + password +  ')';
            document.getElementById('balance').innerHTML = balancebody.balance;
            validUsername = true;
          }
        }  
      }
    }

    function getBet() {
      validBet = false;
      if(validUsername == false) {
        return;
      }
      if(started == false) {
        bet = Number(betField.value);
        let bal = Number(document.getElementById('balance').innerHTML);
        if(bet > bal || bet <= 0)
        {
          document.getElementById("bet").innerHTML = "invalid bet";
        }
        else {
          document.getElementById("bet").innerHTML = bet;
          validBet = true;
        }
        
      }
    }

    userSubmit.addEventListener('click', checkUser);
    betSubmit.addEventListener('click', getBet);
    //document.getElementById("username").innerHTML = username;
    // Add event listeners to the buttons
    document.getElementById("dealButton").addEventListener("click", deal);
    document.getElementById("hitButton").addEventListener("click", hit);
    document.getElementById("standButton").addEventListener("click", stand);

    // Function to handle the "Deal" button click
    function deal() {
      console.log(started)
      if(validBet == false || started == true) {
        return;
      }
      // TODO: Implement the logic for dealing the cards
      let xhr_start = new XMLHttpRequest(); //Defines xmlhttp objject
      xhr_start.open("GET", `http://localhost:3000/start/${username}/${bet}`); // request to the website
      xhr_start.send(); //sends the request
      xhr_start.onload = function() {
        started = true;
        let startbody = JSON.parse(xhr_start.responseText);
        console.log(startbody);

        document.getElementById("dealer_total").innerHTML = '-';
        document.getElementById("user_total").innerHTML = '-';
        
        let dealer_cards = startbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("dealer");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        for(let i = dealer_cards.length; i < dealerElements.length; i++) {
            dealerElements[i].src = "back.png";
        }
        let user_cards = startbody.player_cards;
        let userElements = document.getElementsByClassName("user");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        for(let i = user_cards.length; i < userElements.length; i++) {
            userElements[i].src = "back.png";
        }
      }
      console.log("Deal button clicked");
    }

    // Function to handle the "Hit" button click
    function hit() {
      if(validBet == false || started == false) {
        return;
      }
      // TODO: Implement the logic for hitting (drawing) a card
      let xhr_hit = new XMLHttpRequest(); //Defines xmlhttp objject
      xhr_hit.open("GET", `http://localhost:3000/hit/${username}`); // request to the website
      xhr_hit.send(); //sends the request
      xhr_hit.onload = function() {
        let hitbody = JSON.parse(xhr_hit.responseText);
        console.log(hitbody.win)
        let dealer_cards = hitbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("dealer");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        let user_cards = hitbody.player_cards;
        let userElements = document.getElementsByClassName("user");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        if(hitbody.win == 0) {
          document.getElementById("dealer_total").innerHTML = 'win';
          document.getElementById("user_total").innerHTML = 'lose';
          document.getElementById('balance').innerHTML = hitbody.balance;
          started = false;
        }
        console.log(hitbody);
      }
      console.log("Hit button clicked");
    }

    // Function to handle the "Stand" button click
    function stand() {
      if(validBet == false || started == false) {
        return;
      }
      // TODO: Implement the logic for standing (ending the player's turn)
      let xhr_stand = new XMLHttpRequest(); //Defines xmlhttp objject
      xhr_stand.open("GET", `http://localhost:3000/stand/${username}`); // request to the website
      xhr_stand.send(); //sends the request
      xhr_stand.onload = function() {
        let standbody = JSON.parse(xhr_stand.responseText);
        let dealer_cards = standbody.dealer_cards;
        let dealerElements = document.getElementsByClassName("dealer");
        for(let i = 0; i < dealer_cards.length; i++) {
            dealerElements[i].src = dealer_cards[i].image;
        }
        let user_cards = standbody.player_cards;
        let userElements = document.getElementsByClassName("user");
        for(let i = 0; i < user_cards.length; i++) {
            userElements[i].src = user_cards[i].image;
        }
        if(standbody.win == 0) {
          document.getElementById("dealer_total").innerHTML = 'win';
          document.getElementById("user_total").innerHTML = 'lose';
        }
        else if(standbody.win == 1) {
          document.getElementById("dealer_total").innerHTML = 'lose';
          document.getElementById("user_total").innerHTML = 'win';
        }
        else {
          document.getElementById("dealer_total").innerHTML = 'tie';
          document.getElementById("user_total").innerHTML = 'tie';
        }
        document.getElementById('balance').innerHTML = standbody.balance;
        started = false;
        console.log(standbody.win)
        console.log(standbody);
      }
      console.log("Stand button clicked");
    }