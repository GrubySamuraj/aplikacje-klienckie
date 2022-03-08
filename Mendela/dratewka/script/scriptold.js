class Plansza{
    constructor(opis,img,rgb,directions,item,y,x){
        this.directions = directions;
        this.img = `./content/img/${img}`;
        this.opis = opis;
        this.div = document.getElementById("screen");
        this.item = item;
        this.rgb = rgb;
        this.input = document.getElementById("input").value.toLocaleUpperCase();
        this.x = x;
        this.y = y;
        this.player = {
            locy:3,
            locx:6,
            item:"",
            special_items:[]
        }
    }
    load(){
        console.log("load: x:",this.x," y: ",this.y );
        let obrazek = document.getElementById("obrazekimg");
        obrazek.setAttribute("src",this.img);
        obrazek.style.backgroundColor = this.rgb;
        document.getElementById("title").innerHTML = this.opis;
        document.getElementById("directions").innerHTML = "You can go "
        for(let x = 0; x < this.directions.length; x++){
            document.getElementById("directions").innerHTML += this.directions[x] + " ";
        }
        if(this.item){
            document.getElementById("directions").innerHTML += `<br>You see a ${this.item}<br>`;
        }
        else{
            document.getElementById("directions").innerHTML += "<br>You see nothing <br>";
        }
        document.getElementById("directions").innerHTML += "You are carrying nothing";
    }
    listener(){
        document.getElementById("input").onkeydown = (event) => {
            if(event.keyCode === 13){
                this.move();
            }
        }
    }
    main = () => {
        this.load();
        this.listener();
    }
    move = () =>{
        let input = document.getElementById("input").value.toLocaleUpperCase();
        if(input == "E"){
            input = "EAST"
        }
        else if(input == "W"){
            input = "WEST"
        }
        else if(input == "S"){
            input = "SOUTH"
        }
        else if(input == "N"){
            input = "NORTH"
        }

        if(this.directions.includes(input)){
            console.log("-----------------------------");
            console.log("cos");
            switch(input) {
                case "EAST":
                    this.x++;
                    console.log("y: ",this.y," x: ", this.x);
                    game.plansza[this.y][this.x].load();
                break;
                case "WEST":
                    this.x--;
                    console.log("y: ",this.y," x: ", this.x);
                    game.plansza[this.y][this.x].load();
                break;
                case "SOUTH":
                    this.y++;
                    console.log("y: ",this.y," x: ", this.x);
                    game.plansza[this.y][this.x].load();
                break;
                case "NORTH":
                    this.y--;
                    console.log("y: ",this.y," x: ", this.x);
                    game.plansza[this.y][this.x].load();
                break;
                default:
                    document.getElementById("directions").innerHTML = "Please input suitable value, click space to continue..";
                    alert("nie dziala");
                };
                
            }
        else{
            console.log("nie ma tak");
            document.getElementById("directions").innerHTML = "Please input suitable value, click space to continue..";
        }
    }
}
let game = {
    plansza: [[],[],[],[],[],[],[]],
    loaddata(){
        //1
        let x = 0
        this.plansza[x].push(new Plansza("You are inside a brimstone mine","11.gif","rgb(235,211,64)",[`EAST`],"knife",x,0));
        this.plansza[x].push(new Plansza("You are at the entrance to the mine", "12.gif", "rgb(89,93,87)",[`EAST`,`WEST`],"",x,1));
        this.plansza[x].push(new Plansza("A hill", "13.gif", "rgb(89,93,87)",[`EAST`,`WEST`,`SOUTH`],"",x,2));
        this.plansza[x].push(new Plansza("Some bushes", "14.gif", "rgb(202,230,51)",[`EAST`,`WEST`],"",x,3));
        this.plansza[x].push(new Plansza("An old deserted hut", "15.gif", "rgb(220,204,61)",[`EAST`,`WEST`,],"",x,4));
        this.plansza[x].push(new Plansza("The edge of a forest", "16.gif", "rgb(167,245,63)",[`EAST`,`WEST`],"",x,5));
        this.plansza[x].push(new Plansza("A dark forest", "17.gif", "rgb(140,253,99)",[`WEST`,`SOUTH`],"",x,6));
        //2
        x++;
        this.plansza[x].push(new Plansza("A man nearby making tar","21.gif","rgb(255,190,99)",[`EAST`,`SOUTH`],"",x,0));
        this.plansza[x].push(new Plansza("A timber yard", "22.gif", "rgb(255,190,99)",[`EAST`,`WEST`,`SOUTH`],"",x,1));
        this.plansza[x].push(new Plansza("You are by a roadside shrine", "23.gif", "rgb(167,245,63)",[`EAST`,`WEST`,`SOUTH`,`NORTH`],"",x,2));
        this.plansza[x].push(new Plansza("You are by a small chapel", "24.gif", "rgb(212,229,36)",[`EAST`,`WEST`],"",x,3));
        this.plansza[x].push(new Plansza("You are on a road leading to a wood", "25.gif", "rgb(167,245,63)",[`EAST`,`WEST`,`SOUTH`],"",x,4));
        this.plansza[x].push(new Plansza("You are in a forest", "26 i 65.gif", "rgb(167,245,63)",[`EAST`,`WEST`],"",x,5));
        this.plansza[x].push(new Plansza("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)",[`WEST`,`NORTH`],"",x,6));
        //3
        x++;
        this.plansza[x].push(new Plansza("You are by the Vistula River","31.gif","rgb(122,232,252)",[`EAST`,`NORTH`],"",x,0));
        this.plansza[x].push(new Plansza("You are by the Vistula River", "32.gif", "rgb(140,214,255)",[`WEST`,`NORTH`],"",x,1));
        this.plansza[x].push(new Plansza("You are on a bridge over river", "33.gif", "rgb(108,181,242)",[`SOUTH`,`NORTH`],"",x,2));
        this.plansza[x].push(new Plansza("You are by the old tavern", "34.gif", "rgb(255,189,117)",[`EAST`],"",x,3));
        this.plansza[x].push(new Plansza("You are at the town's end", "35.gif", "rgb(255,190,99)",[`WEST`,`SOUTH`,`NORTH`],"",x,4));
        this.plansza[x].push(new Plansza("You are in a butcher's shop", "36.gif", "rgb(255,188,102)",[`SOUTH`],"",x,5));
        this.plansza[x].push(new Plansza("You are in a cooper's house", "37.gif", "rgb(140,253,99)",[`SOUTH`],"",x,6));
        //4
        x++;
        this.plansza[x].push(new Plansza("You are in the Wawel Castle","41.gif","rgb(255,176,141)",[`EAST`],"",x,0)); //przejscie warunkowe
        this.plansza[x].push(new Plansza("You are inside a dragon's cave", "42.gif", "rgb(198,205,193)",[`WEST`,`EAST`],"",x,1));
        this.plansza[x].push(new Plansza("A perfect place to set a trap", "43.gif", "rgb(255,176,141)",[`WEST`,`NORTH`],"",x,2));
        this.plansza[x].push(new Plansza("You are by the water mill", "44.gif", "rgb(255,190,99)",[`EAST`],"",x,3));
        this.plansza[x].push(new Plansza("You are at a main crossroad", "45.gif", "rgb(255,190,99)",[`EAST`,`WEST`,"SOUTH",`NORTH`],"",x,4));
        this.plansza[x].push(new Plansza("You are on a town street", "46.gif", "rgb(255,190,99)",["EAST",`WEST`,"NORTH"],"",x,5));
        this.plansza[x].push(new Plansza("You are in a frontyard of your house", "47.gif", "rgb(255,190,99)",[`WEST`,"SOUTH",`NORTH`],"",x,6));
        //5
        x++;
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(new Plansza("You are by a swift stream", "54.gif", "rgb(108,181,242)",[`EAST`],"",x,3));
        this.plansza[x].push(new Plansza("You are on a street leading forest", "55.gif", "rgb(255,190,99)",[`WEST`,"SOUTH",`NORTH`],"",x,4));
        this.plansza[x].push(new Plansza("You are in a woodcutter's backyard", "56.gif", "rgb(255,190,99)",["SOUTH"],"",x,5));
        this.plansza[x].push(new Plansza("You are in a shoemaker's house", "57.gif", "rgb(254,194,97)",[`NORTH`],"",x,6));
        //6
        x++;
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(new Plansza("You are in a bleak funeral house", "64.gif", "rgb(254,194,97)",[`EAST`],"",x,3));
        this.plansza[x].push(new Plansza("You are on a path leading to the wood", "26 i 65.gif", "rgb(167,245,63)",["EAST",`WEST`,`NORTH`],"",x,4));
        this.plansza[x].push(new Plansza("You are at the edge of a forest", "66.gif", "rgb(167,245,63)",["EAST",`WEST`,`NORTH`],"",x,5));
        this.plansza[x].push(new Plansza("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)",[`WEST`],"",x,6));
    },
    gamemain(){
        this.loaddata();
        
        this.plansza[3][6].main();
        document.addEventListener("click",function(){
            document.getElementById("input").focus();
        });
        document.getElementById("input").addEventListener("input", function(){
            this.value = this.value.toLocaleUpperCase();
        });
    }
}
game.gamemain();