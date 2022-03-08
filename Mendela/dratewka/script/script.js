class Plansza{
    constructor(opis,img,rgb,directions,item,y,x,usableitem,akcja){
        this.directions = directions;
        this.img = `./content/img/${img}`;
        this.opis = opis;
        this.div = document.getElementById("screen");
        this.item = item;
        this.rgb = rgb;
        this.input = document.getElementById("input").value.toLocaleUpperCase();
        this.x = x;
        this.y = y;
        this.usableitem = usableitem;
        this.akcja = akcja;
    }
    load(){
        if(!document.getElementById("direction")){
            document.getElementById("directions").innerHTML = "";
            let div1 = document.createElement("div");
            div1.setAttribute("id","direction");
            let div2 = document.createElement("div");
            div2.setAttribute("id","item");
            let div3 = document.createElement("div");
            div3.setAttribute("id","eq");
            let elements = [div1,div2,div3];
        for(let x = 0; x < 3;x++){
            document.getElementById("directions").appendChild(elements[x]);
        }
    }
        let obrazek = document.getElementById("obrazekimg");
        obrazek.setAttribute("src",this.img);
        obrazek.style.backgroundColor = this.rgb;
        document.getElementById("title").innerHTML = this.opis;
        document.getElementById("direction").innerHTML = "You can go "
        for(let x = 0; x < this.directions.length; x++){
            document.getElementById("direction").innerHTML += this.directions[x] + " ";
        }
        console.log(this.item);
        if(this.item[0]){
            document.getElementById("item").innerHTML = "You see "
            for(let x = 0; x < this.item.length; x++){
                document.getElementById("item").innerHTML += this.item[x].odmiana + " ";
            }
        }
        else{
            document.getElementById("item").innerHTML = "You see nothing";
        }
        if(game.player.item){
            document.getElementById("eq").innerHTML = `You are carrying ${game.player.item.odmiana}`;
        }else{
            document.getElementById("eq").innerHTML = `You are carrying nothing`;
        }
    }
}
let game = {
    items : [
        {
            id:10,
            odmiana:"a KEY",
            flag:1,
            nazwa:"KEY",
        },
        {
            id:11, 
            odmiana:"an AXE", 
            flag:1, 
            nazwa:"AXE",
        },
        {
            id:12, 
            odmiana:"STICKS", 
            flag:1, 
            nazwa:"STICKS",
        },
        {
            id:13, 
            odmiana:"sheeplegs", 
            flag:0,
            nazwa:"sheeplegs",
        },
        {
            id:14, 
            odmiana:"MUSHROOMS", 
            flag:1, 
            nazwa:"MUSHROOMS"
        },
        {
            id:15, 
            odmiana:"MONEY", 
            flag:1, 
            nazwa:"MONEY"
        },
        {
            id:16, 
            odmiana:"MONEY", 
            flag:1, 
            nazwa:"MONEY"
        },
        {
            id:17, 
            odmiana:"a sheeptrunk", 
            flag:0, 
            nazwa:"sheeptrunk"
        },
        {
            id:18, 
            odmiana:"BERRIES", 
            flag:1, 
            nazwa:"BERRIES"
        },
        {
            id:19, 
            odmiana:"WOOL", 
            flag:1, 
            nazwa:"WOOL"
        },
        {
            id:20, 
            odmiana:"a sheepskin", 
            flag:0, 
            nazwa:"sheepskin"
        },
        {
            id:21, 
            odmiana:"a BAG", 
            flag:1, 
            nazwa:"BAG"
        },
        {
            id:22, 
            odmiana:"a RAG", 
            flag:1, 
            nazwa:"RAG"
        },
        {
            id:23, 
            odmiana:"a sheephead", 
            flag:0, 
            nazwa:"sheephead"
        },
        {
            id:24, 
            odmiana:"a SPADE", 
            flag:1, 
            nazwa:"SPADE"
        },
        {
            id:25, 
            odmiana:"SULPHUR", 
            flag:1, 
            nazwa:"SULPHUR"
        },
        {
            id:26, 
            odmiana:"a solid poison", 
            flag:0, 
            nazwa:"solid poison"
        },
        {
            id:27, 
            odmiana:"a BUCKET", 
            flag:1, 
            nazwa:"BUCKET"
        },
        {
            id:28, 
            odmiana:"TAR", 
            flag:1, 
            nazwa:"TAR"
        },
        {
            id:29, 
            odmiana:"a liquid poison", 
            flag:0, 
            nazwa:"liquid poison"
        },
        {
            id:30, 
            odmiana:"a dead dragon", 
            flag:0,
            nazwa:"dead dragon"
        },
        {
            id:31, 
            odmiana:"a STONE", 
            flag:1, 
            nazwa:"STONE"
        },
        {
            id:32, 
            odmiana:"a FISH", 
            flag:1, 
            nazwa:"FISH"
        },
        {
            id:33, 
            odmiana:"a KNIFE", 
            flag:1, 
            nazwa:"KNIFE"
        },
        {
            id:34, 
            odmiana:"a DRAGONSKIN", 
            flag:1, 
            nazwa:"DRAGONSKIN"
        },
        {
            id:35, 
            odmiana:"a dragonskin SHOES", 
            flag:1, 
            nazwa:"SHOES"
        },
        {
            id:36, 
            odmiana:"a PRIZE", 
            flag:1, 
            nazwa:"PRIZE"
        },
        {
            id:37, 
            odmiana:"a SHEEP", 
            flag:1, 
            nazwa:"SHEEP"
        },
    ],
    plansza: [[],[],[],[],[],[],[]],
    kierunki: ["NORTH","SOUTH","EAST","WEST"],
    player: {
        locy:3,
        locx:6,
        item:"",
        special_items:[]
    },
    current_location:{
        posx:6,
        posy:3
    },
    input:document.getElementById("input").value.toLocaleUpperCase(),
    loaddata(){
        //1
        let x = 0
        this.plansza[x].push(new Plansza("You are inside a brimstone mine","11.gif","rgb(235,211,64)",[`EAST`],"",x,0,[this.items[14]],"You are digging... (timeout) and digging... (timeout) That's enough sulphur for you"));
        this.plansza[x].push(new Plansza("You are at the entrance to the mine", "12.gif", "rgb(89,93,87)",[`EAST`,`WEST`],[],x,1));
        this.plansza[x].push(new Plansza("A hill", "13.gif", "rgb(89,93,87)",[`EAST`,`WEST`,`SOUTH`],[this.items[21]],x,2));
        this.plansza[x].push(new Plansza("Some bushes", "14.gif", "rgb(202,230,51)",[`EAST`,`WEST`],[],x,3));
        this.plansza[x].push(new Plansza("An old deserted hut", "15.gif", "rgb(220,204,61)",[`EAST`,`WEST`,],[this.items[17]],x,4));
        this.plansza[x].push(new Plansza("The edge of a forest", "16.gif", "rgb(167,245,63)",[`EAST`,`WEST`],[],x,5));
        this.plansza[x].push(new Plansza("A dark forest", "17.gif", "rgb(140,253,99)",[`WEST`,`SOUTH`],[this.items[4]],x,6));
        //2
        x++;
        this.plansza[x].push(new Plansza("A man nearby making tar","21.gif","rgb(255,190,99)",[`EAST`,`SOUTH`],"",x,0,[this.items[17]],"You got a bucket full of tar"));
        this.plansza[x].push(new Plansza("A timber yard", "22.gif", "rgb(255,190,99)",[`EAST`,`WEST`,`SOUTH`],[],x,1));
        this.plansza[x].push(new Plansza("You are by a roadside shrine", "23.gif", "rgb(167,245,63)",[`EAST`,`WEST`,`SOUTH`,`NORTH`],[this.items[0]],x,2));
        this.plansza[x].push(new Plansza("You are by a small chapel", "24.gif", "rgb(212,229,36)",[`EAST`,`WEST`],[],x,3));
        this.plansza[x].push(new Plansza("You are on a road leading to a wood", "25.gif", "rgb(167,245,63)",[`EAST`,`WEST`,`SOUTH`],[],x,4));
        this.plansza[x].push(new Plansza("You are in a forest", "26 i 65.gif", "rgb(167,245,63)",[`EAST`,`WEST`],[],x,5));
        this.plansza[x].push(new Plansza("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)",[`WEST`,`NORTH`],[this.items[8]],x,6));
        //3
        x++;
        this.plansza[x].push(new Plansza("You are by the Vistula River","31.gif","rgb(122,232,252)",[`EAST`,`NORTH`],[],x,0));
        this.plansza[x].push(new Plansza("You are by the Vistula River", "32.gif", "rgb(140,214,255)",[`WEST`,`NORTH`],[this.items[22]],x,1));
        this.plansza[x].push(new Plansza("You are on a bridge over river", "33.gif", "rgb(108,181,242)",[`SOUTH`,`NORTH`],[],x,2));
        this.plansza[x].push(new Plansza("You are by the old tavern", "34.gif", "rgb(255,189,117)",[`EAST`],"",x,3,[this.items[4]],"The tavern owner paid you money"));
        this.plansza[x].push(new Plansza("You are at the town's end", "35.gif", "rgb(255,190,99)",[`WEST`,`SOUTH`,`NORTH`],[],x,4));
        this.plansza[x].push(new Plansza("You are in a butcher's shop", "36.gif", "rgb(255,188,102)",[`SOUTH`],"",x,5,[this.items[8]],"The butcher gave you wool"));
        this.plansza[x].push(new Plansza("You are in a cooper's house", "37.gif", "rgb(140,253,99)",[`SOUTH`],"",x,6,[this.items[5]],"The cooper sold you a new barrel"));
        //4
        x++;
        this.plansza[x].push(new Plansza("You are in the Wawel Castle","41.gif","rgb(255,176,141)",[`EAST`],"",x,0,[this.items[25]],"The King is impressed by your shoes")); //przejscie warunkowe
        this.plansza[x].push(new Plansza("You are inside a dragon's cave", "42.gif", "rgb(198,205,193)",[`WEST`,`EAST`],[],x,1));
        this.plansza[x].push(new Plansza("A perfect place to set a trap", "43.gif", "rgb(255,176,141)",[`WEST`,`NORTH`],"",x,2,[this.items[2],this.items[6],this.items[9],this.items[12],this.items[15],this.items[18],this.items[27],this.items[23]],"You prepared legs for your fake sheep"));
        this.plansza[x].push(new Plansza("You are by the water mill", "44.gif", "rgb(255,190,99)",[`EAST`],[this.items[11]],x,3));
        this.plansza[x].push(new Plansza("You are at a main crossroad", "45.gif", "rgb(255,190,99)",[`EAST`,`WEST`,"SOUTH",`NORTH`],[],x,4));
        this.plansza[x].push(new Plansza("You are on a town street", "46.gif", "rgb(255,190,99)",["EAST",`WEST`,"NORTH"],[],x,5));
        this.plansza[x].push(new Plansza("You are in a frontyard of your house", "47.gif", "rgb(255,190,99)",[`WEST`,"SOUTH",`NORTH`],[],x,6));
        //5
        x++;
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(new Plansza("You are by a swift stream", "54.gif", "rgb(108,181,242)",[`EAST`],[],x,3));
        this.plansza[x].push(new Plansza("You are on a street leading forest", "55.gif", "rgb(255,190,99)",[`WEST`,"SOUTH",`NORTH`],[this.items[23]],x,4));
        this.plansza[x].push(new Plansza("You are in a woodcutter's backyard", "56.gif", "rgb(255,190,99)",["SOUTH"],"",x,5,[this.items[0]],"You opened a tool shed and took an axe"));
        this.plansza[x].push(new Plansza("You are in a shoemaker's house", "57.gif", "rgb(254,194,97)",[`NORTH`],"",x,6,[this.items[11],this.items[14]],["You used your tools to make a rag","You used your tools to make shoes"]));
        //6
        x++;
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(0);
        this.plansza[x].push(new Plansza("You are in a bleak funeral house", "64.gif", "rgb(254,194,97)",[`EAST`],[this.items[14]],x,3));
        this.plansza[x].push(new Plansza("You are on a path leading to the wood", "26 i 65.gif", "rgb(167,245,63)",["EAST",`WEST`,`NORTH`],[],x,4));
        this.plansza[x].push(new Plansza("You are at the edge of a forest", "66.gif", "rgb(167,245,63)",["EAST",`WEST`,`NORTH`],[],x,5));
        this.plansza[x].push(new Plansza("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)",[`WEST`],"",x,6,[this.items[1]],"You cut sticks for sheeplegs"));
    },
    startgame(){
        this.loaddata();
        console.log(this.plansza);
        this.plansza[this.current_location.posy][this.current_location.posx].load();
        document.addEventListener("click",function(){
            document.getElementById("input").focus();
        });
        document.getElementById("input").addEventListener("input", function(){
            this.value = this.value.toLocaleUpperCase();
            game.input = document.getElementById("input").value;
        });
        this.listener();
    },
    listener(){
        document.getElementById("input").onkeydown = (event) => {
            if(event.keyCode === 13){
                this.move();
            }
            else{
                game.plansza[game.current_location.posy][game.current_location.posx].load();
            }
        }
    },
    neanderregex(){
        if(this.input == "E"){
            this.input = "EAST"
        }
        else if(this.input == "W"){
            this.input = "WEST"
        }
        else if(this.input == "S"){
            this.input = "SOUTH"
        }
        else if(this.input == "N"){
            this.input = "NORTH"
        }
        else if(this.input[0] =="T" && this.input[1] !="A"){
            let cw = this.input.split("");
            cw.splice(1, 0, 'A');
            cw.splice(2, 0, 'K');
            cw.splice(3, 0, 'E');
            this.input = cw.join("");
            console.log(this.input);
        }
        else if(this.input[0] =="D" && this.input[1] !="R"){
            let cw = this.input.split("");
            cw.splice(1, 0, 'R');
            cw.splice(2, 0, 'O');
            cw.splice(3, 0, 'P');
            this.input = cw.join("");
            console.log(this.input);
        }
        else if(this.input == "U"){
            this.input = "USE"
        }
        else if(this.input == "V"){
            this.input = "VOCABULARY"
        }
        else if(this.input == "G"){
            this.input = "GOSSIPS"
        }
    },
    move(){
        this.neanderregex();
        if(this.kierunki.includes(this.input)){
            if(this.plansza[this.current_location.posy][this.current_location.posx].directions.includes(this.input)){
                switch(this.input) {
                    case "EAST":
                        this.current_location.posx++;
                        console.log("y: ",this.current_location.posy," x: ", this.current_location.posx);
                    break;
                    case "WEST":
                        this.current_location.posx--;
                        console.log("y: ",this.current_location.posy," x: ", this.current_location.posx);
                    break;
                    case "SOUTH":
                        this.current_location.posy++;
                        console.log("y: ",this.current_location.posy," x: ", this.current_location.posx);
                    break;
                    case "NORTH":
                        this.current_location.posy--;
                        console.log("y: ",this.current_location.posy," x: ", this.current_location.posx);
                    break;
                    };
                    game.plansza[this.current_location.posy][this.current_location.posx].load();
                }
            else{
                document.getElementById("directions").innerHTML = "You can't go that way.";
            }
        }
        else if(this.input.match(new RegExp("(TAKE*.)"))){
            let itemek = this.input.substring(5,this.input.length);
            let indx = 0;
            for(let x = 0;x < this.plansza[this.current_location.posy][this.current_location.posx].item.length;x++){
                if(this.plansza[this.current_location.posy][this.current_location.posx].item[x].nazwa == itemek){
                    indx = x;
                }
            }
            if(this.plansza[this.current_location.posy][this.current_location.posx].item && game.player.item.length == 0 && this.plansza[this.current_location.posy][this.current_location.posx].item[indx].flag == 1){
                game.player.item = this.plansza[this.current_location.posy][this.current_location.posx].item[indx];
                document.getElementById("directions").innerHTML = `You are taking ${this.plansza[this.current_location.posy][this.current_location.posx].item[indx].odmiana}`
                this.plansza[this.current_location.posy][this.current_location.posx].item[indx] = "";
            }
            else if(game.player.item.length != 0){
                document.getElementById("directions").innerHTML = "You are carrying something";
            }
            else if(this.plansza[this.current_location.posy][this.current_location.posx].item.flag == 0){
                document.getElementById("directions").innerHTML = "You can't carry it";
            }
            else{
                document.getElementById("directions").innerHTML = "There isn't anything like that here";
            }
        }
        else if(this.input.match(new RegExp("(DROP*.)"))){
            let pom = 0;
            for(let x = 0; x < this.plansza[this.current_location.posy][this.current_location.posx].item.length;x++){
                if(this.plansza[this.current_location.posy][this.current_location.posx].item.flag == 1){
                    pom++;
                }
            }
            let itemek = this.input.substring(5,this.input.length);
            if(!this.player.item){
                document.getElementById("directions").innerHTML = "You are not carrying anything";
            }
            else if(pom > 3){
                document.getElementById("directions").innerHTML = "You can't store any more here"; //nie działa
            }
            else if(game.player.item.nazwa != itemek){
                document.getElementById("directions").innerHTML = "You are not carrying it";
            }
            else{
                document.getElementById("directions").innerHTML = `You are about to drop ${game.player.item.odmiana}`
                this.plansza[this.current_location.posy][this.current_location.posx].item.push(game.player.item);
                if(this.plansza[this.current_location.posy][this.current_location.posx].item[0] == ""){
                    this.plansza[this.current_location.posy][this.current_location.posx].item.shift();
                }
                console.log(this.plansza[this.current_location.posy][this.current_location.posx].item);
                game.player.item = "";
            }
        }
        else if(this.input== "USE"){
            console.log("used");
        }
        else if(this.input== "VOCABULARY"){
            document.getElementById("directions").innerHTML = "NORTH or N, SOUTH or S <br>"+
            "WEST or W, EAST or E <br>"+
            "TAKE (object) or T (object) <br>"+
            "DROP (object) or D (object) <br>"+
            "USE (object) or U (object) <br>"+
            "GOSSIPS or G, VOCABULARY or V <br>"+
            "Press any key to continue";
        }
        else if(this.input== "GOSSIPS"){
            document.getElementById("directions").innerHTML = "The  woodcutter lost  his home key..."+
            "The butcher likes fruit... The cooper"+
            "is greedy... Dratewka plans to make a"+
            "poisoned  bait for the dragon...  The"+
            "tavern owner is buying food  from the"+
            "pickers... Making a rag from a bag..."+
            "Press any key";
        }
        else{
            document.getElementById("directions").innerHTML = "Please input suitable value, type V or VOCABULARY for help, click space to continue..";
        }
    },
}
game.startgame();