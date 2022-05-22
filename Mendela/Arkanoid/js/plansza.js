"use strict";
import { plansza } from "./main.js";
class Plansza {
    constructor() {
        this.plansz = document.getElementById("plansza");
        this.planszaArray = [];
        this.width = 14;
        this.height = 30;
        this.canvasPlansza = document.getElementById("planszaCanvas");
        this.clickedDivs = [];
        this.actualClickedDivs = [];
        this.plansz.addEventListener("mousedown", this.createKwadrat);
        document.addEventListener("contextmenu", this.rclick);
        this.cos;
    }
    createPlansza = () => {
        let posx = 0;
        let posy = 0;
        let id = 0;
        this.plansz.style.width = this.width * 56 + "px";
        for (let x = 0; x < this.height; x++) {
            posx = 0;
            for (let y = 0; y < this.width; y++) {
                let div = document.createElement("div");
                div.setAttribute("id", "blokPlanszy" + id)
                div.setAttribute("posx", posx);
                div.setAttribute("posy", posy);
                div.classList.add("blockContainerPlansza");
                div.addEventListener("mouseenter", this.focus);
                div.addEventListener("mouseleave", this.unfocus);
                div.addEventListener("click", this.clicked);
                this.plansz.appendChild(div);
                this.planszaArray.push(div);
                posx += 56;
                id++;
            }
            posy += 29
        }
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "planszaCanvas");
        canvas.style.width = this.width * 56 + "px";
        canvas.style.height = this.height * 29 + "px";
        canvas.setAttribute("width", this.width * 56);
        canvas.setAttribute("height", this.height * 29);
        this.plansz.appendChild(canvas);
        console.log(canvas);
    }
    clicked() {
        if (!plansza.clickedDivs.includes(this)) {
            plansza.clickedDivs.push(this);
            this.removeEventListener("mouseleave", plansza.unfocus);
        }
    }
    focus() {
        this.style.opacity = 0.5;
        this.style.borderColor = "red";
    }
    focus2(el) {
        el.style.opacity = 0.5;
        el.style.borderColor = "red";
        el.removeEventListener("mouseleave", plansza.unfocus);
    }
    unfocus() {
        this.style.opacity = 1;
        this.style.borderColor = "white";
    }
    unfocus2(el) {
        el.style.opacity = 1;
        el.style.borderColor = "white";
    }
    createKwadrat(e) {
        document.addEventListener("mouseup", plansza.removeKwadrat);
        let div = document.createElement("div");
        div.setAttribute("id", "zaznaczenie");
        plansza.fX = e.clientX;
        plansza.fY = e.clientY;
        div.style.top = e.clientY + "px";
        div.style.left = e.clientX + "px";
        let body = document.body;
        body.appendChild(div);
        console.log(div);
        plansza.plansz.addEventListener("mousemove", plansza.poruszanie);
    }
    removeKwadrat() {
        let div = document.getElementById("zaznaczenie");
        if (div) {
            div.remove();
            plansza.plansz.removeEventListener("mousemove", plansza.poruszanie);
            plansza.plansz.addEventListener("mousedown", plansza.createKwadrat);
        }
    }
    poruszanie(event) {
        plansza.clickedDivs = [];
        let div = document.getElementById("zaznaczenie");
        let overlap = div.getBoundingClientRect();
        let x = overlap.x;
        let y = overlap.y;
        let plansz = document.getElementById("plansza");
        let left = parseInt(getComputedStyle(plansz).left.slice(0, 3));
        let pX = Math.floor((x - left) / 56);
        let pY = Math.floor(y / 29);
        let id = (pY * plansza.width) + pX;
        let ileWidth = Math.ceil(overlap.width / 56);
        let ileHeight = Math.ceil(overlap.height / 29);
        let difference = plansza.clickedDivs.filter(x => plansza.cos.indexOf(x) === -1);
        console.log(difference);
        plansza.clickedDivs = [];
        if (plansza.fX < event.clientX && plansza.fY < event.clientY) {
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    plansza.clickedDivs.push(selectedDiv);
                }
            }
            div.style.width = event.clientX - plansza.fX + "px";
            div.style.height = event.clientY - plansza.fY + "px";
        }
        else if (plansza.fX < event.clientX && plansza.fY > event.clientY) {
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    plansza.clickedDivs.push(selectedDiv);
                }
            }
            div.style.top = event.clientY + "px";
            div.style.left = plansza.pX + "px";
            div.style.width = event.clientX - plansza.fX + "px";
            div.style.height = plansza.fY - event.clientY + "px";
        }
        else if (plansza.fX > event.clientX && plansza.fY < event.clientY) {
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    plansza.clickedDivs.push(selectedDiv);
                }
            }
            div.style.top = plansza.pY + "px";
            div.style.left = event.clientX + "px";
            div.style.height = event.clientY - plansza.fY + "px";
            div.style.width = plansza.fX - event.clientX + "px";
        }
        else if (plansza.fX > event.clientX && plansza.fY > event.clientY) {
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    plansza.clickedDivs.push(selectedDiv);
                }
            }
            div.style.top = event.clientY + "px";
            div.style.left = event.clientX + "px";
            div.style.width = plansza.fX - event.clientX + "px";
            div.style.height = plansza.fY - event.clientY + "px";
        }
    }
    rclick(e) {
        e.preventDefault();
        let div = document.createElement("div");
    }
}
export { Plansza } 