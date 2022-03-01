class Plansza{
    constructor(opis,img,rgb,directions,item){
        this.directions = directions;
        this.img = `./content/img/${img}`;
        this.opis = opis;
        this.div = document.getElementById("screen")
        this.item = item;
        this.rgb = rgb;
    }
    load(){
        let obrazek = document.getElementById("obrazekimg");
        obrazek.setAttribute("src",this.img);
        obrazek.style.backgroundColor = this.rgb;
        document.getElementById("title").innerHTML = this.opis;
        document.getElementById("directions").innerHTML = "You can go "
        for(let x = 0; x < this.directions.length; x++){
            document.getElementById("directions").innerHTML += this.directions[x] + " ";
        }
        document.getElementById("directions").innerHTML += "<br>You see nothing <br>"
        document.getElementById("directions").innerHTML += "You are carrying nothing"
    }
}
let game = {
    main(){
        cos = new Plansza("You are inside a brimstone mine","11.gif","rgb(235,211,64)",[`EAST`],"knife");
        cos2 = new Plansza("You are at the entrance to the mine", "12.gif", "rgb(89,93,87)",[`EAST`],"knife");
        cos.load();
        document.addEventListener("click",function(){
            document.getElementById("input").focus();
        });
        document.getElementById("input").addEventListener("input", function(){
            this.value = this.value.toLocaleUpperCase();
        });
    },

}
game.main();