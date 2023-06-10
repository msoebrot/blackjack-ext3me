function checkUser() {
    console.log("checkUser");
    let user = username.value;
    let pass = password.value;
    if(user.length < 1 || pass.length < 1) {
        alert('invalid')
        return;
    }
    let xhr_balance = new XMLHttpRequest();
    xhr_balance.open("GET", `http://localhost:3000/validate/${user}/${pass}`);
    xhr_balance.send();
    xhr_balance.onload = function (){
        let balancebody = JSON.parse(xhr_balance.responseText);
        if(balancebody.validUser == false) {
            alert('Wrong username or password!');
        }
        else {
            location.replace("https://msoebrot.github.io/blackjack-ext3me/gamescreen.html");
        }
    }  
}