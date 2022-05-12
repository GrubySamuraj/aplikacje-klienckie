let wiadomosc;
let nick;
let time;
let kolor;
let timestamp;
let id;
let currentID;
let cos = 0;
init = () => {
    while (!nick) {
        nick = prompt("Podaj swój nick");
    }
    kolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    displaymsg(`Witaj <span style="color:${kolor};">${nick}</span> na naszym serwerze IRC!</br>`);
    displaymsg(`Twój kolor to <span style="color:${kolor};">${kolor}</span></br>`);
    whatID();
    document.getElementById("wiadomosc").onkeydown = (e) => {
        if (e.which == 13) {
            let current = new Date();
            wiadomosc = document.getElementById("wiadomosc").value;
            if (wiadomosc.match("^/color.*")) {
                console.log(wiadomosc.slice(7));
                colour = wiadomosc.slice(7);
                if (colour.match("#.*") && colour.length == 7) {
                    kolor = colour;
                    displayMessage("server", "#FF0000", "Zmieniono kolor na " + kolor, current);
                }
                else {
                    displayMessage("server", "#FF0000", "Proszę podać poprawny kolor!", current);
                }
            }
            else if (wiadomosc.match("^/nick.*")) {
                console.log(wiadomosc.slice(6));
                nick = wiadomosc.slice(6);
                colour = wiadomosc.slice(7);
                displayMessage("server", "#FF0000", "Zmieniono nick na " + nick, current);
            }
            else if (wiadomosc == "/quit") {
                window.setTimeout(function () {
                    displayMessage("server", "#FF0000", "Wychodzenie...", current);
                }, 2000)
                close_tab()
            }
            else if (wiadomosc == "/help") {
                displayMessage("server", "#FF0000", "Aby zmienić nick, należy wpisac polecenie /nick, aby zmienić kolor, należy wpisać komendę /color, aby uzyskać pomoc należy wpisać /help, aby wyjśc należy wpisać /quit (może nie działać na niektórych przeglądarkach)", current);
            }
            else {
                displayMessage(nick, kolor, document.getElementById("wiadomosc").value, current);
                sendMessage(nick, kolor, document.getElementById("wiadomosc").value, current);
            }
            document.getElementById("wiadomosc").value = "";
        }
    }
}
function close_tab() {
    if (confirm("Do you want to close this tab?")) {
        window.close();
    }
}
function displaymsg(msg) {
    let chat = document.getElementById("visual");
    chat.innerHTML += msg;
    chat.scrollTop = chat.scrollHeight;
}
function displayMessage(nick, kolor, wiadomosc, time) {
    let chat = document.getElementById("visual");
    let diveczka = document.createElement("div");
    diveczka.setAttribute("class", "container");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "time");
    var h = new Date(time).getHours();
    var m = new Date(time).getMinutes();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    var output = h + ':' + m;
    div1.innerText = "[" + output + "]";
    let div2 = document.createElement("div");
    div2.setAttribute("class", "nick");
    div2.style.color = kolor;
    div2.innerText = "<@" + nick + ">";
    let div3 = document.createElement("div");
    div3.setAttribute("class", "message");
    div3.innerText = wiadomosc;
    diveczka.appendChild(div1);
    diveczka.appendChild(div2);
    diveczka.appendChild(div3);
    chat.appendChild(diveczka);
    // chat.innerHTML += "<br/>"
    chat.scrollTop = chat.scrollHeight;
    $(".message").emoticonize();
}
function whatID() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php", true);
    xhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            id = json.id[0][0];
            if (cos == 0) {
                await alp();
            }
            cos++;
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=whatID");
}
function send(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(this.responseText);
            if (json.status != "null") {
                whatID();
                console.log(json);
                let cos123 = new Date(json.data[0][2]).getTime();
                console.log(cos123);
                console.log(json.data[0][2]);
                console.log(json.data);
                id = json.id + 1;
                if (json.data[0][1] != nick) {
                    displayMessage(json.data[0][1], json.data[0][4], json.data[0][3], cos123);
                }
            }
            alp();
        }
    }
    console.log(id);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get&last=" + id);
}
async function alp() {
    send('ajax.php');
}
sendMessage = (nick, kolor, wiadomosc, time) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=send&nick=${encodeURIComponent(nick)}&message=${encodeURIComponent(wiadomosc)}&kolor=${encodeURIComponent(kolor)}&time=${encodeURIComponent(time)}`);
}

function main() {
    init();
}
asynchroniczna = async () => {

}

