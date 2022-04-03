function send() {
    const xhttp = new XMLHttpRequest();
    let imie = encodeURIComponent(document.getElementById("imie").value);
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=add&imie=" + imie);
}

function get() {
    const xhttp = new XMLHttpRequest();
    let imie = document.getElementById("imie").value
    xhttp.open("POST", "ajax.php");

    xhttp.onreadystatechange = function () {
        // console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            document.getElementById("out").innerText = "";
            for (let i = 0; i < json.length; i++) {
                let div = document.createElement("div")
                div.innerText = json[i][1];
                document.getElementById("out").appendChild(div);
            }
        }
        else{
            let img = document.createElement("img");
            img.setAttribute("src","./img/loading.gif");
            document.getElementById("out").appendChild(img);
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");
}