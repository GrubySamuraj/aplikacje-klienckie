init = () => {
    let nick;
    while (!nick) {
        nick = prompt("Podaj swój nick");
    }
    let kolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    displaymsg(`Witaj <span style="color:${kolor};">${nick}</span> na naszym serwerze IRC!</br>`);
    displaymsg(`Twój kolor to <span style="color:${kolor};">${kolor}</span></br>`);
    setNickname(nick,kolor);
}
function displaymsg(msg) {
    let chat = document.getElementById("visual");
    chat.innerHTML += msg;
    chat.scrollTop = chat.scrollHeight;
}
function sendMessage(){
    
}
setNickname = async(nick,kolor) => {
    console.log(nick);
    let data = new FormData();
    data.append("name", nick)
    data.append("color", kolor);
    const options = {
        method:"POST",
        body: data
    }

    let response = await fetch("ajax.php", options);
    if(!response.ok)
        return response.status;
    else
        return await response.json();
}
// async function jazda() {
//     let prom = new Promise((resolve) => {
//         setTimeout(() => { resolve("minęły 3sek."); }, 3000)
//     })
	
//     console.log("start");
//     console.log(prom);   // Promise { : "pending" }
//     // await oczekuje na dopełnienie obietnicy
//     console.log(await prom);   // minęły 3sek.
//     await new Promise(res => { setTimeout(res, 3000) });  
//     console.log("i kolejne 3 sek.") // i kolejne 3 sek.
// }

// jazda();