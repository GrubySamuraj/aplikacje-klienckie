function main() {
    let link = document.getElementById("link");
    let btn = document.getElementById("submit");
    btn.addEventListener("click", () => {
        send(link.value)
    });
}
function send(value) {
    let body = document.getElementsByTagName("body")[0];
    let data = { value: value }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch('/data', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let table = document.createElement("table");
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML = "Link";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Maile";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Podstrony";
            tr.appendChild(th);
            table.appendChild(tr);
            console.log(data);
            for (let x = 0; x < data.length; x++) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                td.innerHTML = data[x].link;
                tr.appendChild(td);
                td = document.createElement("td");
                if (data[x].mails.length > 0) {
                    for (let y = 0; y < data[x].mails.length; y++) {
                        td.innerHTML += data[x].mails[y] + "<br/>";
                        tr.appendChild(td)
                    }
                }
                else {
                    td.innerHTML = "Brak maili";
                    tr.appendChild(td)
                }
                td = document.createElement("td");
                if (data[x].podstrony.length > 0) {
                    for (let y = 0; y < data[x].podstrony.length; y++) {
                        td.innerHTML += data[x].podstrony[y] + "<br/>";
                        tr.appendChild(td)
                    }
                }
                else {
                    td.innerHTML = "Brak podstron";
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }
            body.appendChild(table);
        });
}
main();