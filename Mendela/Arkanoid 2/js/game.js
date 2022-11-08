"use strict";
import { plansza } from "./main.js";
import { game } from "./main.js"
class Game {
    constructor() {
        document.getElementById("accept").addEventListener("click", this.init);
        this.mapa = document.getElementById("mapa");
        this.suma = 0;
        this.hitboxes = [];
    }
    init = () => {
        this.cienieCavas();
        let canvas = document.createElement("canvas");
        let canvas2 = document.getElementById("cienie");
        let plansza1 = document.getElementById("plansza");
        let canvasPlansza = document.getElementById("planszaCanvas");
        canvas.setAttribute("id", "tlo");
        console.log(canvasPlansza);
        canvas.style.width = canvasPlansza.width + plansza.offsetX + 50 + "px";
        canvas.style.height = canvasPlansza.height + 130 + "px";
        canvas.style.transform = `translate(${plansza.offsetX}px,-${plansza.offsetY}px)`;
        canvas.setAttribute("width", canvasPlansza.width + 50);
        canvas.setAttribute("height", canvasPlansza.height);
        let ctx = canvas.getContext("2d");
        let ctx2 = canvas2.getContext("2d");
        let sx = 128;
        let sy = 384;
        let dx = plansza.offsetX / 2;
        let dy = plansza.offsetY;
        let cienHeight = 30;
        let cienWidth = 30;
        // rysowanie rurek
        ctx.drawImage(this.mapa, 129, 12, 124, 113, 0, 0, canvasPlansza.width + 50, canvas.height);
        //rysowanie planszy
        ctx.drawImage(this.mapa, sx, sy, 127, 127, dx, dy, canvas.width - plansza.offsetX, canvas.height);
        ctx.beginPath();
        //rysowanie cieni rurek
        ctx2.fillStyle = "rgba(0,0,0,0.7)";
        ctx2.rect(0, 0, 30, canvas.height);
        ctx2.fill();
        ctx2.beginPath();
        ctx2.fillStyle = "rgba(0,0,0,0.7)";
        ctx2.rect(30, 0, canvas.width, cienHeight);
        ctx2.fill();
        plansza1.appendChild(canvas);
        for (let x of plansza.planszaArray) {
            if (x.getAttribute("content")) {
                let div = document.createElement("div");
                div.classList.add("hitboxes");
                div.style.top = parseInt(x.getAttribute("posy")) + "px";
                div.style.left = parseInt(x.getAttribute("posx")) + "px";
                this.hitboxes.push(div);
                let posx = parseInt(x.getAttribute("posx"));
                let posy = parseInt(x.getAttribute("posy")) - plansza.offsetY / 2;
                ctx2.beginPath();
                ctx2.fillStyle = "rgba(0,0,0,0.7)";
                ctx2.rect(posx, posy, 56, 29);
                ctx2.fill();
                x.remove();
                document.getElementById("plansza").appendChild(div);
            }
            else {
                x.remove();
            }
        }
        this.PaletkaCreate();
        this.createKula();
        this.cienieCavas();
        document.getElementById("accept").remove();
    }
    PaletkaCreate = () => {
        let canvas = document.getElementById("tlo");
        let paletka = document.createElement("div");
        paletka.setAttribute("id", "paletka");
        paletka.style.top = canvas.height - plansza.offsetY + "px";
        document.getElementById("plansza").appendChild(paletka);
        document.body.addEventListener("keydown", function (e) {
            if (e.keyCode == 37) { //left
                game.suma = -10;
            }
            else if (e.keyCode == 39) { //right
                game.suma = 10;
            }
        });
        console.log(game.suma);
        document.body.addEventListener("keyup", function () {
            game.suma = 0;
        });
        let canvasPlansza = document.getElementById("planszaCanvas");
        console.log(canvasPlansza.width);
        this.pos = (canvasPlansza.width / 2) - 75;
        let ctx = canvasPlansza.getContext("2d");
        ctx.drawImage(this.mapa, 171, 106, 26, 6, this.pos, parseInt(paletka.style.top.slice(0, -2)), 150, 20);
        requestAnimationFrame(this.movediv);
    }
    cien = (posx, posy, width, height) => {
        let canvas = document.getElementById("cienie");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.rect(posx + 30, posy + 30, width, height);
        ctx.fill();
    }
    cienieCavas = () => {
        let canvas = document.createElement("canvas");
        let canvasPlansza = document.getElementById("planszaCanvas");
        let plansza1 = document.getElementById("plansza");
        canvas.setAttribute("id", "cienie");
        canvas.style.width = canvasPlansza.width + (3 * plansza.offsetX / 4) + "px";
        canvas.style.height = canvasPlansza.height + 130 + "px";
        canvas.style.transform = `translate(${(plansza.offsetX - 5) / 2}px, 5px)`;
        canvas.setAttribute("width", canvasPlansza.width + 50);
        canvas.setAttribute("height", canvasPlansza.height);
        plansza1.appendChild(canvas);
    }
    createKula = () => {
        this.kula = document.createElement("div");
        let canvas = document.getElementById("tlo");
        let canvasPlansza = document.getElementById("planszaCanvas");
        let ctx = canvasPlansza.getContext("2d");
        let fx = canvasPlansza.width / 2;
        let fy = canvasPlansza.height - plansza.offsetY - 25;
        ctx.drawImage(this.mapa, 317, 225, 4, 4, fx, fy, 25, 25);
        this.kula.style.top = canvas.height - plansza.offsetY - 25 + "px";
        this.kula.style.left = (canvasPlansza.width / 2) + 'px';
        this.kula.setAttribute("id", "kula");
        document.getElementById("plansza").appendChild(this.kula);
    }
    movediv(timestamp) {
        var fps = 60;
        let canvas = document.getElementById("tlo");
        let canvasPlansza = document.getElementById("planszaCanvas");
        let ctx = canvasPlansza.getContext("2d");
        let cos = -2;
        let cos1 = 2;
        let R = 3;
        setTimeout(function () {
            console.log(game.suma);
            if ((game.pos + 150 <= (canvas.width - (plansza.offsetX) / 2)) && game.suma > 0 || game.pos >= 0 && game.suma < 0) {
                game.pos += game.suma;
            }
            //paletka
            ctx.clearRect(game.pos - game.suma, parseInt(paletka.style.top.slice(0, -2)), 56, 29);
            ctx.clearRect(game.pos + 150, parseInt(paletka.style.top.slice(0, -2)), 56, 29);
            ctx.drawImage(game.mapa, 171, 106, 26, 6, game.pos, parseInt(paletka.style.top.slice(0, -2)), 150, 20);
            paletka.style.left = game.pos + 'px';
            //koniec palekti
            //piłka

            let kat = (3 * Math.PI) / 4;
            game.kula.style.top = parseInt(game.kula.style.top.slice(0, -2)) + (R * Math.cos(kat)) + "px";
            game.kula.style.left = parseInt(game.kula.style.left.slice(0, -2)) + (R * Math.sin(kat)) + "px";
            ctx.clearRect(game.kula.style.left.slice(0, -2) - cos, game.kula.style.top.slice(0, -2) - cos1, 25, 25);
            ctx.drawImage(this.mapa, 317, 225, 4, 4, game.kula.style.left.slice(0, -2), game.kula.style.top.slice(0, -2), 25, 25);
            requestAnimationFrame(game.movediv);
        }, 1000 / fps);
    }
}
export { Game }