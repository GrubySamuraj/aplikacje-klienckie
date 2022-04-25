let json_flagi;
let json_stopy;
let poprzednie_val;
let elementy;
let selected_flag;
let input_nominal;
let nr_kat_input;
let select_input;
let input_rok;
let poprzednie = [];

function createget() {
    let table = document.getElementById("tab");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.setAttribute("colspan", "6");
    td.innerHTML = "Dodawanie rekordu";
    tr.appendChild(td);
    table.appendChild(tr);
    let tr1 = document.createElement("tr");
    for (let x = 0; x < 6; x++) {
        let td = document.createElement("td");
        if (x == 0) {
            let select = document.createElement("select");
            select.setAttribute("id", "flaga");
            for (let y = 0; y < json_flagi.length; y++) {
                let option = document.createElement("option");
                option.setAttribute("value", json_flagi[y][1]);
                option.innerHTML = json_flagi[y][1];
                select.appendChild(option);
            }
            td.appendChild(select);
        }
        else if (x == 1) {
            let input = document.createElement("input");
            input.setAttribute("id", "nominal");
            td.appendChild(input);
        }
        else if (x == 2) {
            let input = document.createElement("input");
            input.setAttribute("id", "kategoria");
            td.appendChild(input);
        }
        else if (x == 3) {
            let select = document.createElement("select");
            select.setAttribute("id", "stop");
            for (let y = 0; y < json_stopy.length; y++) {
                let option = document.createElement("option");
                option.innerHTML = json_stopy[y][1];
                option.setAttribute("value", json_stopy[y][1]);
                select.appendChild(option);
            }
            td.appendChild(select);
        }
        else if (x == 4) {
            let input = document.createElement("input");
            input.setAttribute("id", "rok");
            td.appendChild(input);
        }
        else if (x == 5) {
            let img = document.createElement("img");
            img.setAttribute("id", "faja");
            img.setAttribute("src", "./img/faja.png");
            img.addEventListener("click", dodaj);
            td.appendChild(img);
        }
        tr1.appendChild(td);
        table.appendChild(tr1);
    }
}
function dodaj() {
    const xhttp = new XMLHttpRequest();
    let flaga = document.getElementById("flaga").value;
    let stop = document.getElementById("stop").value;
    let id_flagi;
    let id_stopu;
    for (let x = 0; x < json_flagi.length; x++) {
        if (json_flagi[x][1] == flaga) {
            id_flagi = json_flagi[x][0];
        }
    }
    for (let x = 0; x < json_stopy.length; x++) {
        if (json_stopy[x][1] == stop) {
            id_stopu = json_stopy[x][0];
        }
    }
    let nominal = encodeURIComponent(document.getElementById("nominal").value);
    let kategoria = encodeURIComponent(document.getElementById("kategoria").value);
    let rok = encodeURIComponent(document.getElementById("rok").value);
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tab").innerHTML = `<tr><th style="border-left:transparent 1px solid"></th><th>nominał</th><th>nr. kat</th><th>stop</th><th>rok</th><th style="border-right:transparent 1px solid"></th></tr>`;
            get();
            poprzednie = [];
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=add&flaga=${id_flagi}&nominal=${nominal}&kategoria=${kategoria}&stop=${id_stopu}&rok=${rok}`);
}
function usun() {
    let id = this.parentElement.parentElement.id.substring(2);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tab").innerHTML = `<tr><th style="border-left:transparent 1px solid"></th><th>nominał</th><th>nr. kat</th><th>stop</th><th>rok</th><th style="border-right:transparent 1px solid"></th></tr>`;
            get();
            poprzednie = [];
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=remove&id=${id}`);
}
function get() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            for (let x = 0; x < json.length; x++) {
                json[x][1] = json[x][7];
                json[x][4] = json[x][9];
                json[x].pop();
                json[x].pop();
                json[x].pop();
                json[x].pop();
            }
            console.log("json: " + json);
            let tab = document.getElementById("tab");
            for (let j = 0; j < json.length; j++) {
                let tr = document.createElement("tr");
                tr.setAttribute("id", `id${json[j][0]}`);
                json[j].shift();
                for (let i = 0; i < json[j].length; i++) {
                    let td = document.createElement("td");
                    if (i == 0) {
                        let img = document.createElement("img");
                        img.setAttribute("src", "./img/" + json[j][i]);
                        img.addEventListener("click", edit);
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
                img.addEventListener("click", usun);
                td1.appendChild(img);
                tr.appendChild(td1);
                tab.appendChild(tr);
            }
            getflagi()
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");
}
function getflagi() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getstopy();
            json_flagi = JSON.parse(this.responseText);
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=getflagi`);
}
function edit() {
    console.log(poprzednie);
    if (poprzednie) {
        console.log(poprzednie);
        powroc(poprzednie);
        poprzednie = [];
    }
    elementy = this.parentElement.parentElement.children;
    let el = this.parentElement.parentElement;
    let id = el.id.substring(2);
    console.log(id);
    for (let x = 0; x < elementy.length; x++) {
        if (x == 0) {
            let select = document.createElement("select");
            select.setAttribute("id", `flaga${id}`);
            let flaga = elementy[x].childNodes[0].getAttribute("src").substring(6);
            for (let y = 0; y < json_flagi.length; y++) {
                let option = document.createElement("option");
                if (json_flagi[y][1] == flaga) {
                    option.setAttribute("selected", true);
                }
                option.setAttribute("value", json_flagi[y][0]);
                option.innerHTML = json_flagi[y][1];
                select.appendChild(option);
            }
            elementy[x].childNodes[0].remove();
            elementy[x].appendChild(select);
        }
        else if (x == 3) {
            let select = document.createElement("select");
            select.setAttribute("id", `stop${id}`);
            let nominal = elementy[x].innerHTML;
            for (let y = 0; y < json_stopy.length; y++) {
                let option = document.createElement("option");
                if (json_stopy[y][1] == nominal) {
                    option.setAttribute("selected", true);
                }
                option.setAttribute("value", json_stopy[y][0]);
                option.innerHTML = json_stopy[y][1];
                select.appendChild(option);
            }
            elementy[x].childNodes[0].remove();
            elementy[x].appendChild(select);
        }
        else if (x == 5) {
            elementy[x].children[0].setAttribute("src", "./img/faja.png");
            elementy[x].children[0].removeEventListener("click", usun);
            elementy[x].children[0].addEventListener("click", send2);
        }
        else {
            let content = elementy[x].innerHTML;
            let input = document.createElement("input");
            input.setAttribute("id", `inp_${x}_${id}`);
            input.value = content;
            elementy[x].innerHTML = "";
            elementy[x].appendChild(input);
        }
        if(elementy[x].children[0].value != undefined){
            poprzednie.push(elementy[x].children[0].value);
        }
    }
    poprzednie.push(id);
}
function send2() {
    let id = this.parentElement.parentElement.id.substring(2);
    let flaga = document.getElementById(`flaga${id}`).value;
    let stop = document.getElementById(`stop${id}`).value;
    let nominal = encodeURIComponent(document.getElementById(`inp_1_${id}`).value);
    let kategoria = encodeURIComponent(document.getElementById(`inp_2_${id}`).value);
    let rok = encodeURIComponent(document.getElementById(`inp_4_${id}`).value);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tab").innerHTML = `<tr><th style="border-left:transparent 1px solid"></th><th>nominał</th><th>nr. kat</th><th>stop</th><th>rok</th><th style="border-right:transparent 1px solid"></th></tr>`;
            get();
            poprzednie = []
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=send2&flaga=${flaga}&nominal=${nominal}&kategoria=${kategoria}&stop=${stop}&rok=${rok}&id=${id}`);
}
function getstopy() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json_stopy = JSON.parse(this.responseText);
            createget();
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=getstopy`);
}
function powroc(elementy) {
    console.log(elementy);
    let tr = document.getElementById("id" + elementy[5]);
    for (let x = 0; x < elementy.length; x++) {
        if (x == 0) {
            let td = tr.children[x];
            td.children[0].remove();
            let img = document.createElement("img");
            img.addEventListener("click", edit);
            for(let i = 0; i < json_flagi.length; i++){
                if(json_flagi[i][0] == elementy[x]){
                    img.setAttribute("src", "./img/" + json_flagi[i][1]);
                }
            }
            td.appendChild(img);
        }
        else if(x == 3){
            let td = tr.children[x];
            td.children[0].remove();
            for(let i = 0; i < json_stopy.length; i++){
                if(json_stopy[i][0] == elementy[x]){
                    td.innerHTML = json_stopy[i][1];
                    break;
                }
            }
        }
        else if (x == 1 || x == 2 || x == 4){
            let td = tr.children[x];
            td.children[0].remove();
            td.innerHTML = elementy[x];
        }
        else{
            let td = tr.children[x];
            let img = td.children[0];
            img.setAttribute("src","./img/u.gif");
            img.removeEventListener("click", send2);
            img.addEventListener("click", usun);
        }
    }
}