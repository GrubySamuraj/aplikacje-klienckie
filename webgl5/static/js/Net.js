class Net {
    constructor() {
    }
    zaloguj = () => {
        user = { login: document.getElementById("login").value }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };
        fetch("/zaloguj", options)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data);
                if (data.status == "success") {
                    console.log(data);
                    ui.logged_user = data.id_gracza;
                    console.log(ui.logged_user);
                    console.log("gracze_serwer: " + data.users.length);
                    game.positionset(game.positions[ui.logged_user]);
                    document.getElementById("loginmenu").remove();
                    game.pionkirender();
                }
                document.getElementById("status").innerHTML = data.wiadomosc;
            })
            .catch(error => { console.log(error) });
    }
    reset() {
        fetch("/reset", { method: "POST" })
            .then(function (response) { return response.json() })
            .then(function (data) {
                document.getElementById("status").innerHTML = data;
                window.setTimeout(function () {
                    document.getElementById("status").innerHTML = "STATUS";
                }, 3000)
            })
            .catch(function (error) { console.log(error) });
    }
}
