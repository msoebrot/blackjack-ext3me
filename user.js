function checkUser() {
    console.log("checkUser");
    let user = username.value;
    let pass = password.value;
    if(user.length < 1 || pass.length < 1) {
        alert('invalid')
        validUsername = false;
        return;
    }
    let xhr_balance = new XMLHttpRequest();
    xhr_balance.open("GET", `http://localhost:3000/validate/${user}/${pass}`);
    xhr_balance.send();
    xhr_balance.onload = function (){
        let balancebody = JSON.parse(xhr_balance.responseText);
        if(balancebody.validUser == false) {
            //document.getElementById('name').innerHTML = "Invalid username or password";
            alert('invalid')
            validUsername = false;
        }
        else {
            //document.getElementById('name').innerHTML = user + '(' + pass +  ')';
            //document.getElementById('balance').innerHTML = balancebody.balance;
            alert('valid')
            validUsername = true;
        }
    }  
}