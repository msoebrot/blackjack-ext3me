// username dictionary
let userDict = {'username1' : 500, 'username2' : 500, 'username#' : 500};

// password dictionary tied to username
let passwordDict = {'username1' : 'bill420', 'username 2' : 'emily21', 'username#' : 'blues clues'};

// adds a valid (not used) username to dictionary 
function valid_username ( username ) {
    // alerts if username exists
    if (username in userDict){ 
        // adds username to dictionary 
        return userDict.username; 
    }
    else {
        userDict [username].push(500); // gives user a starter balance 
    }
}    

// adds a charchter limit for username
function validateUsername (username) {
    let alphanumericRegex = /^[a-zA-Z0-9_]+$/;
        return alphanumericRegex.test(username) && username.length >= 2 && username.length <=10;  
}

// adds password to username 
function checkPassword() {
    let password = document.getElementById("password");
    let charchter = "0123456789abcdefghijklmnopqerstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12; 
    if (passwordText == "bill420") {
        return true;
    }
    alert ("Incorrect Password!");
    return false;
}

// adds a "base" balance to user if username does NOT exist  
function update_balance ( username, bet_amount ) {
    let current_balance = valid_username (username);
    userDict.username = current_balance + bet_amount;
}
