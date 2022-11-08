"use strict";
import { plansza } from "./main.js";
import { functionsClick } from "./main.js";
class Plansza {
    constructor() {
        this.plansz = document.getElementById("plansza");
        this.planszaArray = [];
        this.width = 14;
        this.height = 25;
        this.canvasPlansza = document.getElementById("planszaCanvas");
        this.clickedDivs = [];
        this.actualClickedDivs = [];
        this.ctrlClicked = false;
        this.allElements = [];
        this.offsetX = 60;
        this.offsetY = 60;
        this.plansz.addEventListener("mousedown", this.createKwadrat);
        document.addEventListener("contextmenu", this.rclick);
        document.addEventListener("keydown", function (event) {
            if ((event.which == "17" && navigator.platform.indexOf("Windows") === 0) || (event.which == "224" && navigator.platform.indexOf("Mac") === 0)) {
                plansza.ctrlClicked = true;
            }
            else if (event.which == "46") {
                plansza.delete();
            }
        })
        document.addEventListener("keyup", function (event) {
            plansza.ctrlClicked = false;
        })
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
        canvas.style.width = (this.width * 56) + "px"; // poszerzyc do calego playfield
        canvas.style.height = (this.height * 29) + 250 + "px";
        canvas.setAttribute("width", (this.width * 56));
        canvas.setAttribute("height", (this.height * 29) + 250);
        this.plansz.appendChild(canvas);
    }
    clicked() {
        if (plansza.ctrlClicked) {
            if (!plansza.clickedDivs.includes(this)) {
                plansza.clickedDivs.push(this);
                this.removeEventListener("mouseleave", plansza.unfocus);
            }
            else {
                let powt = plansza.clickedDivs.indexOf(this);
                plansza.clickedDivs.splice(powt, 1);
                plansza.unfocus2(this);
            }
        }
        else {
            for (let x = 0; x < plansza.clickedDivs.length; x++) {
                plansza.unfocus2(plansza.clickedDivs[x]);
            }
            plansza.clickedDivs = [];
            plansza.clickedDivs[0] = this;
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
        e.preventDefault();
        document.addEventListener("mouseup", plansza.removeKwadrat);
        let div = document.createElement("div");
        div.setAttribute("id", "zaznaczenie");
        plansza.fX = e.clientX;
        plansza.fY = e.clientY + scrollY;
        div.style.top = e.clientY + scrollY + "px";
        div.style.left = e.clientX + "px";
        let body = document.body;
        body.appendChild(div);
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
        let div = document.getElementById("zaznaczenie");
        let overlap = div.getBoundingClientRect();
        let plansz = document.getElementById("plansza");
        let left = parseInt(getComputedStyle(plansz).left.slice(0, 3));
        let top = parseInt(getComputedStyle(plansz).top.slice(0, 3));
        let pX = Math.floor((overlap.x - left) / 56);
        let pY = Math.floor((overlap.y - top + scrollY) / 29);
        let id = (pY * plansza.width) + pX;
        let roznicax = overlap.x - document.getElementById(`blokPlanszy${id}`).getBoundingClientRect().x;
        let roznicay = overlap.y - document.getElementById(`blokPlanszy${id}`).getBoundingClientRect().y;
        let ileWidth = Math.ceil((overlap.width + roznicax) / 56);
        let ileHeight = Math.ceil((overlap.height + roznicay) / 29);
        if (!plansza.ctrlClicked) {
            for (let x = 0; x < plansza.clickedDivs.length; x++) {
                plansza.unfocus2(plansza.clickedDivs[x]);
                plansza.clickedDivs[x].addEventListener("mouseenter", plansza.focus);
                plansza.clickedDivs[x].addEventListener("mouseleave", plansza.unfocus);
            }
            plansza.clickedDivs = [];
        }
        if (plansza.fX < event.clientX && plansza.fY < event.clientY + scrollY) {
            console.log("w drugin tylko sinus");
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    if (document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`)) {
                        let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                        plansza.focus2(selectedDiv);
                        if (!plansza.clickedDivs.includes(selectedDiv)) {
                            plansza.clickedDivs.push(selectedDiv);
                        }
                    }
                }
            }
            div.style.width = event.clientX - plansza.fX + "px";
            div.style.height = event.clientY - plansza.fY + scrollY + "px";
        }
        else if (plansza.fX < event.clientX && plansza.fY > event.clientY + scrollY) {
            console.log("W pierwszym same plusy");
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    if (!plansza.clickedDivs.includes(selectedDiv)) {
                        plansza.clickedDivs.push(selectedDiv);
                    }
                }
            }
            div.style.top = event.clientY + scrollY + "px";
            div.style.left = plansza.pX + "px";
            div.style.width = event.clientX - plansza.fX + "px";
            div.style.height = plansza.fY - event.clientY - scrollY + "px";
        }
        else if (plansza.fX > event.clientX && plansza.fY < event.clientY + scrollY) {
            console.log("W trzecim tangens i cotangens");
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    if (!plansza.clickedDivs.includes(selectedDiv)) {
                        plansza.clickedDivs.push(selectedDiv);
                    }
                }
            }
            div.style.top = plansza.pY + "px";
            div.style.left = event.clientX + "px";
            div.style.height = event.clientY - plansza.fY + scrollY + "px";
            div.style.width = plansza.fX - event.clientX + "px";
        }
        else if (plansza.fX > event.clientX && plansza.fY > event.clientY - scrollY) {
            console.log("a w czwartym cosinus");
            for (let y = 0; y < ileHeight; y++) {
                for (let x = 0; x < ileWidth; x++) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    if (!plansza.clickedDivs.includes(selectedDiv)) {
                        plansza.clickedDivs.push(selectedDiv);
                    }
                }
            }
            div.style.top = event.clientY + scrollY + "px";
            div.style.left = event.clientX + "px";
            div.style.width = plansza.fX - event.clientX + "px";
            div.style.height = plansza.fY - event.clientY - scrollY + "px";
        }
    }
    delete = () => {
        let canvas = document.getElementById("planszaCanvas");
        let ctx = canvas.getContext("2d");
        let posxy = [];
        let posyy = [];
        for (const clickedDiv of plansza.clickedDivs) {
            if (plansza.allElements.indexOf(clickedDiv)) {
                plansza.allElements.splice(plansza.allElements.indexOf(clickedDiv), 1);
            }
            let posx = parseInt(clickedDiv.getAttribute("posx")) + 2;
            let posy = parseInt(clickedDiv.getAttribute("posy")) + 2;
            posxy.push(posx);
            posyy.push(posy);
            plansza.unfocus2(clickedDiv);
            clickedDiv.addEventListener("mouseleave", plansza.unfocus);
            clickedDiv.removeAttribute("content");
            ctx.clearRect(posx - 1, posy - 1, 56, 29);
        }
        functionsClick.aktualizujHistory(plansza.clickedDivs);
        plansza.clickedDivs = [];
    }
    rclick(e) {
        e.preventDefault();
        let div2 = document.createElement("div");
        div2.setAttribute("id", "przyciemnienie");
        let div = document.createElement("div");
        div.setAttribute("id", "menu");
        for (let x = 0; x < 8; x++) {
            let options = document.createElement("div");
            options.classList.add("options");
            if (x == 0) {
                options.innerText = "Undo";
                options.addEventListener("click", functionsClick.undo);
            }
            else if (x == 1) {
                options.innerText = "Redo";
                options.addEventListener("click", functionsClick.redo);
            }
            else if (x == 2) {
                options.innerText = "Copy";
                options.addEventListener("click", functionsClick.copy);
            }
            else if (x == 3) {
                options.innerText = "Cut";
                options.addEventListener("click", functionsClick.cut);
            }
            else if (x == 4) {
                options.innerText = "Paste";
                options.addEventListener("click", functionsClick.paste);
            }
            else if (x == 5) {
                options.innerText = "Delete";
                options.addEventListener("click", plansza.delete);
            }
            else if (x == 6) {
                options.innerText = "Save to File";
                options.addEventListener("click", functionsClick.saveToFile);
            }
            else if (x == 7) {
                options.innerText = "Load From File";
                options.setAttribute("id", "load");
                options.addEventListener("click", functionsClick.loadFromFile);
            }
            div.appendChild(options);
        }
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(div);
        body.appendChild(div2);
    }
}
export { Plansza } 