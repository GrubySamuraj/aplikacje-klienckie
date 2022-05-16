class Plansza {
    constructor() {
        this.plansz = document.getElementById("plansza");
        this.planszaArray = [];
        this.width = 14;
        this.height = 30;
    }
    createPlansza = () => {
        let id = 0;
        this.plansz.style.width = this.width * 56 + "px";
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                id++;
                let div = document.createElement("div");
                div.classList.add("blockContainerPlansza");
                div.addEventListener("mouseenter", this.focus);
                div.addEventListener("mouseleave", this.unfocus);
                div.addEventListener("click", this.clicked);
                this.plansz.appendChild(div);
                this.planszaArray.push(div);
            }
        }
    }
    clicked() {
        console.log("click");
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