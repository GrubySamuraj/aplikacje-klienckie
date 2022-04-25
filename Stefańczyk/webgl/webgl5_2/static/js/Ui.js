let user
class Ui {
    constructor() {
        this.actual_user = 1;
        this.logged_user = 0;
        this.enemy = 2;
        document.getElementById("loguj").addEventListener("click", net.zaloguj);
        document.getElementById("reset").addEventListener("click", net.reset);
        document.addEventListener("click", function (event) {
            game.myRaycast(event);
        });
    }
    waiting_for_user = () => {
        this.okienko = document.createElement("div");
        this.okienko.setAttribute("id", "wait_info");
        document.getElementsByTagName("body")[0].appendChild(this.okienko);
        this.odliczanie_czasu();
    }
    odliczanie_czasu() {
        let start = Date.now();
        let start_time = 30;
        this.okienko.innerText = `Aktualnie gra przeciwnik, ma na to ${start_time} czasu, po tym czasie automatycznie wygrywasz`;
        this.interwal2 = window.setInterval(() => {
            let time = Date.now();
            this.actual_time = start_time - Math.floor((time - start) / 1000);
            this.okienko.innerText = `Aktualnie gra przeciwnik, ma na to ${this.actual_time} czasu, po tym czasie automatycznie wygrywasz`;
            net.wait_for_move();
            if (this.actual_time == 0) {
                window.clearInterval(this.interwal2);
                net.win();
                let start2 = Date.now();
                let add_time = 10;
                this.interwal3 = window.setInterval(() => {
                    let time = Date.now();
                    let added_actual_time = add_time - Math.floor((time - start2) / 1000);
                    net.wait_for_move();
                    if (added_actual_time == 0) {
                        window.clearInterval(this.interwal3);
                    }
                }, 1000)
            }
        }, 1000);
    }
    clearWait = () => {
        document.getElementById("loading").remove();
        document.getElementById("status").innerHTML = `Witaj ${net.user.nazwa}, grasz na przeciwnika ${net.user.przeciwnik}`;
    }
    createWaitSuccess = () => {
        document.getElementById("loginmenu").remove();
        let img = document.createElement("img");
        img.setAttribute("src", "./img/waiting.gif");
        img.setAttribute("id", "loading");
        let body = document.getElementsByTagName("body");
        body[0].appendChild(img);
    }
    lost = () => {
        this.okienko = document.createElement("div");
        this.okienko.setAttribute("id", "wait_info");
        this.okienko.innerText = `Przegrałeś/aś, wygrany użytkownik to ${net.win_user}`;
        document.getElementById("status").innerText = `Przegrałeś! ${this.logged_user}, ${net.user.przeciwnik} okazał się lepszy!`;
        document.getElementsByTagName("body")[0].appendChild(this.okienko);
    }
    win = () => {
        this.okienko = document.createElement("div");
        this.okienko.setAttribute("id", "wait_info");
        this.okienko.innerText = `Brawo! ${net.win_user}, Wygrałeś/aś z ${net.user.przeciwnik}`;
        document.getElementById("status").innerText = `Wygrałeś! ${this.logged_user}, Gratulacje!`;
        document.getElementsByTagName("body")[0].appendChild(this.okienko);
    }
}