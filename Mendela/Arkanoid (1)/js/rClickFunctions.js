"use strict";
import { plansza } from "./main.js";
import { functionsClick } from "./main.js";
class rClickFunctions {
    constructor() {
        this.history = [[]];
        this.actualhistory = this.history.length - 1;
        this.contents = [];
        this.copied;
        this.copiedDivs;
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
    redo() {
        if (functionsClick.actualhistory < functionsClick.history.length - 1) {
            functionsClick.actualhistory += 1;
            functionsClick.render();
        }
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    copy() {
        functionsClick.copied = [...plansza.clickedDivs];
        console.log(functionsClick.copied[0].id.slice(11));
        let poprzid = functionsClick.copied[0].id.slice(11);
        let width;
        let height = 0;
        for (let x = 0; x < functionsClick.copied.length; x++) {
            // width = 0;
            let id = functionsClick.copied[x].id.slice(11);
            console.log(id - poprzid);
            if (id - poprzid != 1) {
                height++;
            }
            poprzid = id;
        }
        console.log(height);
        width = functionsClick.copied.length / height;
        for (const element of functionsClick.copied) {
            plansza.unfocus2(element);
            element.addEventListener("mouseleave", plansza.unfocus);
        }
        plansza.plansz.addEventListener("mousemove", function (event) {
            let plansz = document.getElementById("plansza");
            let left = parseInt(getComputedStyle(plansz).left.slice(0, 3));
            let pX = Math.floor((event.clientX - left) / 56);
            let pY = Math.floor(event.clientY / 29);
            let id = (pY * plansza.width) + pX;
            let fdiv = document.getElementById(`blokPlanszy${id}`);
            console.log(fdiv);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (document.getElementById(`blokPlanszy${id - 1 + (y * plansza.width)}`)) {
                        let prevDiv = document.getElementById(`blokPlanszy${id - 1 + (y * plansza.width)}`);
                        plansza.unfocus2(prevDiv);
                    }
                    if (document.getElementById(`blokPlanszy${(id + x) + (y - 1) * plansza.width}`)) {
                        let upperDiv = document.getElementById(`blokPlanszy${(id + x) + (y - 1)}`);
                        plansza.unfocus2(upperDiv);
                    }
                    if (document.getElementById(`blokPlanszy${(id + width) + (y * plansza.width)}`)) {
                        let afterDiv = document.getElementById(`blokPlanszy${(id + width) + (y * plansza.width)}`);
                        plansza.unfocus2(afterDiv);
                    }
                    if (document.getElementById(`blokPlanszy${(id + x) + (y + height)}`)) {
                        let underDiv = document.getElementById(`blokPlanszy${(id + x) + (y + height) * plansza.width}`);
                        plansza.unfocus2(underDiv);
                    }
                    let selectedDiv = document.getElementById(`blokPlanszy${(id + x) + (y * plansza.width)}`);
                    plansza.focus2(selectedDiv);
                    // selectedDiv.addEventListener("mouseleave", plansza.unfocus);
                }
            }

        });
        document.getElementById("planszaCanvas").addEventListener("click", functionsClick.paste);
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    paste() {
        document.getElementById("przyciemnienie").remove();
        document.getElementById("planszaCanvas").removeEventListener("click", functionsClick.paste);
        this.parentElement.remove();
    }
    cut() {
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    delete() {
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    saveToFile() {
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
    }
    loadFromFile() {
        document.getElementById("przyciemnienie").remove();
        this.parentElement.remove();
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
}
export { rClickFunctions };
 // undo() {
    //     if (functionsClick.actualhistory >= 0) {
    //         console.log(functionsClick.actualhistory);
    //         if (functionsClick.actualhistory > 0)
    //             functionsClick.actualhistory -= 1;
    //         let actualPlansza = document.getElementById("planszaCanvas");
    //         console.log(functionsClick.history[functionsClick.actualhistory]);
    //         let dodane = plansza.allElements.filter(x => functionsClick.history[functionsClick.actualhistory].indexOf(x) === -1);
    //         console.log(dodane);
    //         // && functionsClick.history[functionsClick.actualhistory].getAttribute("content").indexOf(x.getAttribute("content") === -1)
    //         for (let y = 0; y < functionsClick.history[functionsClick.actualhistory]; y++) {
    //             functionsClick.push(functionsClick.history[functionsClick.actualhistory][y].getAttribute("content"));
    //         }
    //         for (const clickedDiv of dodane) {
    //             let ctx = actualPlansza.getContext("2d");
    //             let posx = parseInt(clickedDiv.getAttribute("posx")) + 2;
    //             let posy = parseInt(clickedDiv.getAttribute("posy")) + 2;
    //             plansza.unfocus2(clickedDiv);
    //             ctx.beginPath();
    //             ctx.fillStyle = "black";
    //             ctx.rect(posx, posy, 56, 29);
    //             ctx.fill();
    //             clickedDiv.addEventListener("mouseleave", plansza.unfocus);
    //             plansza.allElements.splice(plansza.allElements.indexOf(clickedDiv), 1);
    //         }
    //         console.log(plansza.allElements);
    //         functionsClick.clickedDivs = [];
    //     }
    //     document.getElementById("przyciemnienie").remove();
    //     this.parentElement.remove();
    // }