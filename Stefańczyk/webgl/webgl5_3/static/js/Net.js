class Net {
    constructor() {
        this.user = "";
        this.obj;
        this.win_user;
    }
    zaloguj = () => {
        user = JSON.stringify({ login: document.getElementById("login").value })
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: user
        };
        fetch("/zaloguj", options)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data);
                if (data.status == "success") {
                    this.user = {
                        id: data.id_gracza,
                        nazwa: data.nazwa,
                        przeciwnik: "cos"
                    }
                    ui.logged_user = this.user.id + 1;
                    if (ui.logged_user == 1) {
                        ui.enemy = 2;
                    }
                    else if (ui.logged_user == 2) {
                        ui.enemy = 1;
                    }
                    ui.createWaitSuccess();
                    this.interwal = window.setInterval(() => {
                        this.wait();
                    }, 500);
                }
                document.getElementById("status").innerHTML = data.wiadomosc;
                game.camera_position([game.positions[ui.logged_user]]);
            })
            .catch(error => { console.log(error) });
    }
    reset() {
        fetch("/reset", { method: "POST" })
            .then(function (response) { return response.json() })
            .then(function (data) {
                document.getElementById("status").innerHTML = data.wiadomosc;
                location.reload();
            })
            .catch(function (error) { console.log(error) });
    }
    wait() {
        let name = JSON.stringify({ id: this.user.nazwa });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: name
        };
        fetch("/wait", options)
            .then(response => { return response.json() })
            .then(data => {
                if (data.wait == false) {
                    this.user.przeciwnik = data.przeciwnik;
                    game.pionkirender();
                    if (ui.logged_user != ui.actual_user) {
                        ui.waiting_for_user();
                        game.lock_raycast();
                    } else {
                        this.interwal2 = window.setInterval(() => {
                            this.waitForWin();
                        }, 500);
                    }
                    clearInterval(this.interwal);
                    ui.clearWait();
                }
            })
            .catch(error => { console.log(error) });
    }
    move = (obj) => {
        this.obj = obj
        if (game.clicked_pion) {
            let paramY;
            let paramY1;
            let paramX;
            let paramMinusX;
            let paramMinusY;
            let data;
            let odl = Math.abs(game.clicked_pion.posx - obj.posx)
            let odl2 = game.clicked_pion.posx - obj.posx
            console.log(odl2);
            if (game.pionki_obj[obj.posy]?.[obj.posx] == 0 && odl == 1) {
                if (game.clicked_pion.typ == 1) {
                    paramY1 = 1;
                }
                else if (game.clicked_pion.typ == 2) {
                    paramY1 = -1;
                }
            }
            else if (game.pionki_obj[obj.posy]?.[obj.posx] == 0 && odl == 2) {
                if (game.clicked_pion.typ == 1) {
                    paramY = 2;
                }
                else if (game.clicked_pion.typ == 2) {
                    paramY = -2;
                }
                if (odl2 == 2) {
                    paramX = 2;
                }
                else if (odl2 == -2) {
                    paramX = -2;
                }
            }
            if (paramX == 2 && paramY == 2) {
                paramMinusX = 1;
                paramMinusY = 1;
            }
            else if (paramX == 2 && paramY == -2) {
                paramMinusX = 1;
                paramMinusY = -1;
            }
            else if (paramX == -2 && paramY == 2) {
                paramMinusX = -1;
                paramMinusY = 1;
            }
            else if (paramX == -2 && paramY == -2) {
                paramMinusX = -1;
                paramMinusY = -1;
            }
            if ((game.clicked_pion.posy - obj.posy == paramY1) || (game.clicked_pion.posy - obj.posy == paramY1 && game.pionki_obj[obj.posy][obj.posx] == 0) || (game.pionki_obj[obj.posy + paramMinusY]?.[obj.posx + paramMinusX] && game.pionki_obj[obj.posy + paramMinusY][obj.posx + paramMinusX].typ == ui.enemy)) {
                if (game.pionki_obj[obj.posy + paramMinusY]?.[obj.posx + paramMinusX] && game.pionki_obj[obj.posy + paramMinusY]?.[obj.posx + paramMinusX].typ == ui.enemy) {
                    game.zbicie(game.pionki_obj[obj.posy + paramMinusY][obj.posx + paramMinusX]);
                    data = game.move_array(obj, obj.posx + paramMinusX, obj.posy + paramMinusY);
                }
                else {
                    data = game.move_array(obj, -1, -1);
                }
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: data
                };
                fetch("/move", options)
                    .then(response => { return response.json() })
                    .then(data => {
                        game.move(obj);
                        ui.waiting_for_user();
                    })
                    .catch(error => { console.log(error) });
            }
        }
    }
    wait_for_move = () => {
        let data
        data = JSON.stringify({
            plansza: game.pionki
        });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        };
        fetch("/wait_move", options)
            .then(response => { return response.json() })
            .then(data => {
                console.log("data.win: ");
                console.log(data);
                console.log(data.win);
                if (!data.win) {
                    if (JSON.stringify(data.plansza) != JSON.stringify(game.pionki)) {
                        game.moveChange(data, this.obj);
                        if (data.zbityX != -1 && data.zbityY != -1) {
                            game.zbicie(game.pionki_obj[data.zbityY][data.zbityX]);
                        }
                    }
                }
                else {
                    this.win_user = data.win_user
                    if (data.win_user == ui.logged_user) {
                        ui.lost();
                    }
                    else {
                        ui.win();
                    }
                }
            })
            .catch(error => { console.log(error) });
    }
    win = () => {
        let data = JSON.stringify({ log: ui.logged_user });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }
        fetch("/win", options)
            .then(response => { return response.json() })
            .then(data => {
            })
            .catch(error => { console.log(error) });
    }
    waitForWin = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("/winWait", options)
            .then(response => { return response.json() })
            .then(data => {
                if (data.win == true) {
                    ui.lost();
                }
            })
            .catch(error => { console.log(error) });
    }
}
