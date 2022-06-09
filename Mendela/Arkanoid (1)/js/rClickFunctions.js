"use strict";
import { plansza } from "./main.js";
import { functionsClick } from "./main.js";
class rClickFunctions {
    constructor() {
        this.history = [[]];
        this.actualhistory = this.history.length - 1;
        this.contents = [];
        this.copied = [];
        this.pastedDivs = [];
        this.copiedHeight = 0;
        this.copiedWidth = 0;
        this.cutClicked = false;
        this.DivyInfo = [];
    }
    undo() {
        if (functionsClick.actualhistory >= 0) {
            if (functionsClick.actualhistory > 0)
                functionsClick.actualhistory -= 1;
            functionsClick.render();
        }
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    redo() { // poprawić, bo coś nie działa
        if (functionsClick.actualhistory < functionsClick.history.length - 1) {
            functionsClick.actualhistory += 1;
            functionsClick.render();
        }
        console.log(functionsClick.history);
        console.log(functionsClick.actualhistory);
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    copy() {
        functionsClick.copied = [...plansza.clickedDivs];
        for (let copied of functionsClick.copied) {
            plansza.unfocus2(copied);
            copied.addEventListener("mouseenter", plansza.unfocus);
        }
        document.getElementById("przyciemnienie").remove();
        document.getElementById("menu").remove();
    }
    paste() {
        let poprzid = functionsClick.copied[0].id.slice(11);
        let width;
        let height = 0;
        for (let x = 0; x < functionsClick.copied.length; x++) {
            let id = functionsClick.copied[x].id.slice(11);
            console.log(id - poprzid);
            if (id - poprzid != 1) {
                height++;
            }
            poprzid = id;
        }
        width = functionsClick.copied.length / height;
        functionsClick.copiedHeight = height;
        functionsClick.copiedWidth = width;
        for (const element of functionsClick.copied) {
            plansza.unfocus2(element);
            element.addEventListener("mouseleave", plansza.unfocus);
        }
        plansza.plansz.addEventListener("mousemove", functionsClick.ruch);
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    potwierdzenie = () => {
        let pasteDiv = functionsClick.pastedDivs[0];
        let id = parseInt(pasteDiv.id.slice(11));
        let actualPlansza = document.getElementById("planszaCanvas");
        const ctx = actualPlansza.getContext('2d');
        for (let y = 0; y < functionsClick.copiedHeight; y++) {
            for (let x = 0; x < functionsClick.copiedWidth; x++) {
                let pasted = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                let posx = parseInt(pasted.getAttribute("posx"));
                let posy = parseInt(pasted.getAttribute("posy"));
                let div = functionsClick.copied[x + (y * functionsClick.copiedWidth)];
                if (div.getAttribute("content")) {
                    let content = div.getAttribute("content");
                    pasted.setAttribute("content", content);
                    let klocek = document.getElementById(content).children[0];
                    ctx.drawImage(klocek, posx + 2, posy + 2);
                }
                else {
                    ctx.fillStyle = 'black';
                    pasted.removeAttribute("content");
                    ctx.fillRect(posx - 1, posy - 1, 56, 29);
                }
            }
        }
        if (functionsClick.cutClicked) {
            for (let x of functionsClick.copied) {
                x.removeAttribute("content");
            }
        }
        functionsClick.aktualizujHistory(functionsClick.copied);
        functionsClick.copied = [];
        functionsClick.cutClicked = false;
        plansza.plansz.removeEventListener("click", functionsClick.potwierdzenie);
        plansza.plansz.removeEventListener("mousemove", functionsClick.ruch);
        functionsClick.eventListenery();
    }
    cut() {
        functionsClick.copied = [...plansza.clickedDivs];
        for (let copied of functionsClick.copied) {
            plansza.unfocus2(copied);
            copied.addEventListener("mouseenter", plansza.unfocus);
        }
        let actualPlansza = document.getElementById("planszaCanvas");
        const ctx = actualPlansza.getContext('2d');
        functionsClick.cutClicked = true;
        for (let div of functionsClick.copied) {
            ctx.fillStyle = 'black';
            let posx = parseInt(div.getAttribute("posx"));
            let posy = parseInt(div.getAttribute("posy"));
            ctx.fillRect(posx - 1, posy - 1, 56, 29);
        }
        functionsClick.aktualizujHistory(functionsClick.copied);
        document.getElementById("przyciemnienie").remove();
        document.getElementById("menu").remove();
    }
    delete() {
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    saveToFile() {
        console.log(plansza.allElements);
        for (let x = 0; x < plansza.planszaArray.length; x++) {
            if (plansza.planszaArray[x].getAttribute("content")) {
                functionsClick.DivyInfo.push(plansza.planszaArray[x].getAttribute("content"));
            }
            else {
                functionsClick.DivyInfo.push("black");
            }
        }
        let data = { divy: functionsClick.DivyInfo };
        data = JSON.stringify(data);
        console.log(data);
        const filename = "data.json";
        let cos2 = functionsClick.save(data, filename);
        cos2(data, filename);
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    loadFromFile = () => {
        let input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "application/json");
        input.style = "display: none";
        input.click();
        document.body.appendChild(input);
        input.addEventListener("change", functionsClick.load);
        // input.onchange = functionsClick.load;
        document.getElementById("przyciemnienie").remove();
        document.getElementById("menu").remove();
    }
    aktualizujHistory(element) {
        let arr = [];
        for (const el of element) {
            arr.push(el.cloneNode(true))
        }
        functionsClick.history.push(arr);
        functionsClick.actualhistory++;
        if (functionsClick.history.length !== functionsClick.actualhistory + 1) {
            functionsClick.history.splice(functionsClick.actualhistory, functionsClick.history.length - 2);
        }
        console.log(functionsClick.history.length);
        console.log(functionsClick.actualhistory);
        console.log(functionsClick.history);
    }
    render() {
        let actualPlansza = document.getElementById("planszaCanvas");
        const ctx = actualPlansza.getContext('2d');
        ctx.fillStyle = "black";
        ctx.rect(0, 0, actualPlansza.getAttribute("width"), actualPlansza.getAttribute("height"));
        ctx.fill();
        for (let x = 0; x < functionsClick.actualhistory + 1; x++) {
            for (const clickedDiv of functionsClick.history[x]) {
                plansza.allElements = [...functionsClick.history[functionsClick.actualhistory]];
                if (clickedDiv.getAttribute("content")) {
                    let klocek = document.getElementById(clickedDiv.getAttribute("content")).children[0];
                    let posx = parseInt(clickedDiv.getAttribute("posx")) + 2;
                    let posy = parseInt(clickedDiv.getAttribute("posy")) + 2;
                    plansza.unfocus2(clickedDiv);
                    ctx.drawImage(klocek, posx, posy);
                    clickedDiv.addEventListener("mouseleave", plansza.unfocus);
                }
            }
        }
    }
    ruch(event) {
        let plansz = document.getElementById("plansza");
        let left = parseInt(getComputedStyle(plansz).left.slice(0, 3));
        let pX = Math.floor((event.clientX - left) / 56);
        let pY = Math.floor(event.clientY / 29);
        let id = (pY * plansza.width) + pX;
        let fdiv = document.getElementById(`blokPlanszy${id}`);
        for (let y = 0; y < functionsClick.copiedHeight; y++) {
            for (let x = 0; x < functionsClick.copiedWidth; x++) {
                if (document.getElementById(`blokPlanszy${id - 1 + (y * plansza.width)}`)) {
                    let prevDiv = document.getElementById(`blokPlanszy${id - 1 + (y * plansza.width)}`);
                    plansza.unfocus2(prevDiv);
                    functionsClick.pastedDivs.splice(functionsClick.pastedDivs.indexOf(prevDiv), 1);
                }
                if (document.getElementById(`blokPlanszy${(id + x) + (y - 1)}`)) {
                    let upperDiv = document.getElementById(`blokPlanszy${(id + x) + (y - 1)}`);
                    plansza.unfocus2(upperDiv);
                    functionsClick.pastedDivs.splice(functionsClick.pastedDivs.indexOf(upperDiv), 1);
                }
                if (document.getElementById(`blokPlanszy${(id + functionsClick.copiedWidth) + (y * plansza.width)}`)) {
                    let afterDiv = document.getElementById(`blokPlanszy${(id + functionsClick.copiedWidth) + (y * plansza.width)}`);
                    plansza.unfocus2(afterDiv);
                    functionsClick.pastedDivs.splice(functionsClick.pastedDivs.indexOf(afterDiv), 1);
                }
                if (document.getElementById(`blokPlanszy${(id + x) + (y + functionsClick.copiedHeight) * plansza.width}`)) {
                    let underDiv = document.getElementById(`blokPlanszy${(id + x) + (y + functionsClick.copiedHeight) * plansza.width}`);
                    plansza.unfocus2(underDiv);
                    functionsClick.pastedDivs.splice(functionsClick.pastedDivs.indexOf(underDiv), 1);
                }
                if (document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`)) {
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    if (!functionsClick.pastedDivs.includes(fdiv)) {
                        functionsClick.pastedDivs.push(fdiv);
                    }
                }
                // selectedDiv.addEventListener("mouseleave", plansza.unfocus);
            }
        }
        plansza.plansz.addEventListener("click", functionsClick.potwierdzenie);
    }
    eventListenery() {
        for (let div of plansza.planszaArray) {
            plansza.unfocus2(div);
            div.addEventListener("mouseleave", plansza.unfocus);
            div.addEventListener("mouseenter", plansza.focus)
        }
    }
    save = (data, filename, type) => {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.style = "display: none";
        return function () {
            const blob = new Blob([data], { type: "octet/stream" });
            console.log(blob);
            const url = window.URL.createObjectURL(blob);
            link.innerText = "save";
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
        };
    }
    load = (files) => {
        let file = files.srcElement.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        let elements = [];
        reader.onload = function () {
            let data = JSON.parse(reader.result).divy;
            let canvas = document.getElementById("planszaCanvas");
            let ctx = canvas.getContext("2d");
            for (let x = 0; x < plansza.planszaArray.length; x++) {
                if (data[x] == "black") {
                    let posx = parseInt(plansza.planszaArray[x].getAttribute("posx")) + 2;
                    let posy = parseInt(plansza.planszaArray[x].getAttribute("posy")) + 2;
                    ctx.fillStyle = 'black';
                    ctx.fillRect(posx, posy, 56, 29);
                }
                else {
                    elements.push(plansza.planszaArray[x]);
                    let klocek = document.getElementById(data[x]).children[0];
                    let posx = parseInt(plansza.planszaArray[x].getAttribute("posx")) + 2;
                    let posy = parseInt(plansza.planszaArray[x].getAttribute("posy")) + 2;
                    plansza.planszaArray[x].setAttribute("content", data[x]);
                    ctx.drawImage(klocek, posx, posy);
                }
            }
            functionsClick.aktualizujHistory(elements);
        }
    }
}
export { rClickFunctions };