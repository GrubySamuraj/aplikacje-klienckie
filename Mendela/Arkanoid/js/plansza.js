class Plansza {
    constructor() {
        this.plansz = document.getElementById("plansza");
        this.planszaArray = [];
        this.width = 14;
        this.height = 30;
    }
    createPlansza = () => {
        let posx = 0;
        let posy = 0;
        let id = 0;
        this.plansz.style.width = this.width * 56 + "px";
        for (let x = 0; x < this.height; x++) {
            posx = 0;
            for (let y = 0; y < this.width; y++) {
                id++;
                let div = document.createElement("div");
                div.setAttribute("posx", posx);
                div.setAttribute("posy", posy);
                div.classList.add("blockContainerPlansza");
                div.addEventListener("mouseenter", this.focus);
                div.addEventListener("mouseleave", this.unfocus);
                div.addEventListener("click", this.clicked);
                this.plansz.appendChild(div);
                this.planszaArray.push(div);
                posx += 56;
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
        let div = document.getElementById("div" + document.getElementById("clicked").innerHTML);
        if (div) {
            let canvas = document.getElementById("planszaCanvas");
            let ctx = canvas.getContext("2d");
            let posx = parseInt(this.getAttribute("posx")) + 2;
            let posy = parseInt(this.getAttribute("posy")) + 2;
            console.log(posx);
            console.log(posy);
            ctx.drawImage(div.children[0], posx, posy);
        }
    }
    focus() {
        this.style.opacity = 0.5;
        this.style.borderColor = "red";
    }
    unfocus() {
        this.style.opacity = 1;
        this.style.borderColor = "white";
    }
}
export { Plansza } 