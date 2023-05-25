let userDict = {'username1' : 500, 'username2' : 500, 'username#' : 500};

// adds a valid (not used) username to dictionary 
function valid_username ( username ) {
    // alerts if username exists
    if (username in userDict){ 
        // 
        return userDict.username; 
    }
    else {
        return "Username Not In Use!";
    }
}    

// adds a "base" balance to user if username does NOT exist  
function update_balance ( username, bet_amount ) {
    let current_balance = valid_username (username);
    userDict.username = current_balance + bet_amount;
}
