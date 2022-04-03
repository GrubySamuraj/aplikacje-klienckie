// function send() {
//     const xhttp = new XMLHttpRequest();
//     let imie = encodeURIComponent(document.getElementById("imie").value);
//     xhttp.open("POST", "ajax.php");

//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             get();
//         }
//     }

//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send("acc=add&imie=" + imie);
// }
function createget(){
    let table = document.getElementById("tab");
    let tr = document.createElement("tr");
    let td= document.createElement("td");
    td.setAttribute("colspan","6");
    td.innerHTML = "Dodawanie rekordu"
    tr.appendChild(td);
    table.appendChild(tr);
    let tr1 = document.createElement("tr");
    for(let x = 0; x < 6; x++){
        let td = document.createElement("td");
        if(x == 0){
            let select = document.createElement("select");
            let option = document.createElement("option");
        }
        tr1.appendChild(td)
    }
}
function get() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        let cos = this.readyState;
        console.log(cos);
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            for (let x = 0; x < json.length; x++) {
                json[x][1] = json[x][7];
                json[x][4] = json[x][9];
                // json[x].splice();
                json[x].pop();
                json[x].pop();
                json[x].pop();
                json[x].pop();
            }
            console.log(json);
            let tab = document.getElementById("tab");
            for (let j = 0; j < json.length; j++) {
                json[j].shift();
                let tr = document.createElement("tr");
                for (let i = 0; i < json[j].length; i++) {
                    let td = document.createElement("td");
                    if (i == 0) {
                        let img = document.createElement("img");
                        img.setAttribute("src", "./img/" + json[j][i]);
                        td.appendChild(img);
                    }
                    else {
                        td.innerHTML = json[j][i];
                    }
                    tr.appendChild(td);
                }
                let td1 = document.createElement("td");
                let img = document.createElement("img");
                img.setAttribute("src", "./img/u.gif");
                td1.appendChild(img);
                tr.appendChild(td1);
                tab.appendChild(tr);
            }
            createget()
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");
}
function getall(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=getall");
}