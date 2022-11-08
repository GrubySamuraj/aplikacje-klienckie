"use strict";
import { Kloc } from "./kloc.js";
import { Plansza } from "./plansza.js";
import { main } from "./main.js";
import { plansza } from "./main.js";
import { functionsClick } from "./main.js";
class Main {
    constructor() {
        this.kloce = [];
        this.createKloce();
        this.clickedBlock = "";
    }
    createKloce = () => {
        let id = 0;
        let sy = 216;
        let sx = 5;
        for (let x = 0; x < 3; x++) {
            sx = 5;
            for (let y = 0; y < 5; y++) {
                let kloc = new Kloc(sx, sy);
                let div = document.createElement("div");
                div.classList.add("blockContainer");
                div.setAttribute("id", "div" + id);
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.setAttribute("width", 50);
                canvas.setAttribute("height", 25);
                ctx.drawImage(kloc.mapa, sx, sy, 7, 3, 0, 0, 50, 25);
                div.appendChild(canvas);
                div.addEventListener("mouseenter", this.enter);
                div.addEventListener("mouseleave", this.leave);
                div.addEventListener("click", this.click);
                kloc.bloczki.appendChild(div);
                this.kloce.push(kloc);
                id++;
                sx += 10;
            }
            sy += 5;
        }
        let canvas = document.getElementById("planszaCanvas");
    }
    enter() {
        this.style.opacity = 1;
        this.style.borderColor = "orange";
    }
    leave() {
        this.style.opacity = 0.5;
        this.style.borderColor = "white";
    }
    click() {
        let canvas = document.getElementById("planszaCanvas");
        for (const clickedDiv of plansza.clickedDivs) {
            plansza.allElements.push(clickedDiv);
            let klocek = this.children[0];
            let ctx = canvas.getContext("2d");
            let posx = parseInt(clickedDiv.getAttribute("posx")) + 2;
            let posy = parseInt(clickedDiv.getAttribute("posy")) + 2;
            plansza.unfocus2(clickedDiv);
            clickedDiv.setAttribute("content", this.id);
            ctx.drawImage(klocek, posx, posy);
            clickedDiv.addEventListener("mouseleave", plansza.unfocus);
        }
        functionsClick.wyczysc = true;
        functionsClick.aktualizujHistory(plansza.clickedDivs);
        plansza.clickedDivs = [];
    }
}
export { Main };