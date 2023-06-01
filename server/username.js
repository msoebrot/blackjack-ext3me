let userDict = {'username1' : 500, 'username2' : 500, 'username#' : 500};

// adds a valid (not used) username to dictionary 
function valid_username ( username ) {
    // alerts if username exists
    if (username in userDict){ 
        // adds username to dictionary 
        return userDict.username; 
    }
    else {
        userDict [username].push(500);
    }
}    

// adds a charchter limit for username
function validateUsername (username) {
    let alphanumericRegex = /^[a-zA-Z0-9_]+$/;
        return alphanumericRegex.test(username) && username.length >= 2 && username.length <=10;  
}

// adds a "base" balance to user if username does NOT exist  
function update_balance ( username, bet_amount ) {
    let current_balance = valid_username (username);
    userDict.username = current_balance + bet_amount;
}
