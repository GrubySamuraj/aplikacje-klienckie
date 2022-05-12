// init = () => {
//     let nick;
//     while (!nick) {
//         nick = prompt("Podaj swój nick");
//     }
//     let kolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//     displaymsg(`Witaj <span style="color:${kolor};">${nick}</span> na naszym serwerze IRC!</br>`);
//     displaymsg(`Twój kolor to <span style="color:${kolor};">${kolor}</span></br>`);
//     setNickname(nick, kolor);
// }

// function displaymsg(msg) {
//     let chat = document.getElementById("visual");
//     chat.innerHTML += msg;
//     chat.scrollTop = chat.scrollHeight;
// }

// setNickname = async (nick, kolor) => {
//     console.log(nick);
//     let data = new FormData();
//     data.append("name", nick)
//     data.append("color", kolor);
//     const options = {
//         method: "POST",
//         body: data
//     }
//     let response = await fetch("ajax.php", options);
//     if (!response.ok)
//         return response.status;
//     else
//         return await response.json();
// }

function send(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            if (json.status != "null") {
                // są dane - uaktualnij boxy
            }
            send("ajax.php");
        }
    }
    xhttp.send();
}

// send('ajax.php');
