let plansza = document.getElementById("plansza");
let width = 13;
let height = width;
let left = 0;
let top1 = 0;
let elemetyplanszy = [];
let snake = [];
let snakehead = 0;
let ilosc_jablek = 0;
let przycisk = 0;
let pole = width * width;
function createElements(){
    for(let i = 0; i < width; i++){
        left = 0
        plan = []
        for(let j = 0; j < height; j++){
            let div = document.createElement("div");
            div.classList.add("pole");
            div.id = `${i}_${j}`;
            div.style.left = left + "px";
            div.style.top = top1 + "px";
            left+=52;
            type = 0;
            if(i == Math.floor(height/2) && j == Math.floor(width/2)){
                div.classList.add("snakeheadtop");
                div.classList.add("snake");
                snakehead = {
                    posx:i,
                    posy:j
                }
                type = 1;
                let positions = {
                    posx: i,
                    posy: j
                }
                snake.push(positions);
            }
            if(i == 0|| j == 0 || i == width - 1 || j == height - 1){
                div.classList.add("granica");
                type = -2;
            }
            let obj = {
                dom:div,
                pole:type,
            };
            plansza.appendChild(div);
            plan.push(obj);
        }
        elemetyplanszy.push(plan);
        top1+=52;
    }
}
function move(){
    if(snake.length < pole){
        document.addEventListener("keydown",function (e){
            przycisk = e.code;
        })
        interwal = window.setInterval(function(){
            ilosc_jablek = 0;
            for(let i=0;i<elemetyplanszy.length;i++){
                for(let j=0;j<elemetyplanszy[i].length;j++){
                    if(elemetyplanszy[i][j].dom.classList.contains("jablko")){
                        ilosc_jablek++;
                    }
                }
            }
            if(ilosc_jablek == 0){
                generatejabubluszka();
            }
            let idx = snakehead.posx;
            let idy = snakehead.posy;
            if(przycisk == "KeyA"){
                if(elemetyplanszy[idx]?.[idy - 1].pole!=-2 && (elemetyplanszy[idx]?.[idy - 1].pole == -1 || elemetyplanszy[idx]?.[idy - 1].pole == 0)){
                    idy = idy - 1;
                    elemetyplanszy[idx][idy].dom.classList.add("snakeheadleft");
                }
                else{
                    przegrana();
                }
            }
            if(przycisk == "KeyS"){
                if(elemetyplanszy[idx + 1]?.[idy].pole!=-2 && (elemetyplanszy[idx + 1]?.[idy].pole == -1 || elemetyplanszy[idx + 1]?.[idy].pole == 0)){
                    idx = idx + 1;
                    elemetyplanszy[idx][idy].dom.classList.add("snakeheaddown");
                }
                else{
                    przegrana();
                }
            }
            if(przycisk == "KeyD"){
                if(elemetyplanszy[idx]?.[idy + 1].pole!=-2 && (elemetyplanszy[idx]?.[idy + 1].pole == -1 || elemetyplanszy[idx]?.[idy + 1].pole == 0)){
                    idy = idy + 1;
                    elemetyplanszy[idx][idy].dom.classList.add("snakeheadright");
                }
                else{
                    przegrana();
                }   
            }
            if(przycisk == "KeyW"){
                if(elemetyplanszy[idx - 1]?.[idy].pole!=-2 && (elemetyplanszy[idx - 1]?.[idy].pole == -1 || elemetyplanszy[idx - 1]?.[idy].pole == 0)){
                    idx = idx - 1;
                    elemetyplanszy[idx][idy].dom.classList.add("snakeheadtop");
                }
                else{
                    przegrana();
                }  
            }
            clearsnake();
            snake.pop();
            snakehead = {
                posx: idx,
                posy: idy
            }
            if(elemetyplanszy[idx][idy].pole != -1){
                elemetyplanszy[idx][idy].pole = 1;
            }
            if(elemetyplanszy[idx][idy].pole == -1){
                zjedzeniejablka(snakehead);
            }
            snake.unshift(snakehead);
            generatesnake();
        },1000/8)
    }
    else{

    }
}
function clearsnake(){
    for(let x = 0; x < elemetyplanszy.length;x++){
        for(let y = 0; y < elemetyplanszy.length;y++){
            for(let z = 0; z < snake.length; z++){
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snake");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakeheaddown");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakeheadright");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakeheadtop");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakeheadleft");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakebody"); 
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("snakehorizontal");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("ogondol");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("ogongora");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("ogonright");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("ogonleft");
                elemetyplanszy[snake[z].posx][snake[z].posy].dom.classList.remove("jablko");
                elemetyplanszy[snake[z].posx][snake[z].posy].pole = 0
            }
        }
    }
}
function wygrana(){
    alert(`Brawo, wygrałeś :>`);
    window.location.reload(true);
}
function generatesnake(){
    for(let x = 0;x < snake.length;x++){
        let posx = snake[x].posx;
        let posy = snake[x].posy;
        elemetyplanszy[posx][posy].dom.classList.add("snake");
        elemetyplanszy[posx][posy].pole = 1;
        if(x == 0){
            elemetyplanszy[posx][posy].dom.classList.add("snakeheadleft");
        }
        else{
            if(snake[x + 1]){
                if(snake[x].posx == snake[x + 1].posx){
                    elemetyplanszy[posx][posy].dom.classList.add("snakehorizontal");
                }
                else if(snake[x].posy == snake[x + 1].posy){
                    elemetyplanszy[posx][posy].dom.classList.add("snakebody");
                }
            }
            else{
                if(snake[x].posx - snake[x - 1].posx == -1){
                    elemetyplanszy[posx][posy].dom.classList.add("ogondol");
                }
                else if(snake[x].posx - snake[x - 1].posx == 1){
                    elemetyplanszy[posx][posy].dom.classList.add("ogongora");
                }
                else if(snake[x].posy - snake[x - 1].posy == -1){
                    elemetyplanszy[posx][posy].dom.classList.add("ogonright");
                }
                else{
                    elemetyplanszy[posx][posy].dom.classList.add("ogonleft");
                }
            }
            
        }
    }
}
function shownubers(){
    for (let x = 0; x < elemetyplanszy.length; x++){
        for (let y = 0; y < elemetyplanszy[x].length; y++){
            elemetyplanszy[x][y].dom.innerHTML = elemetyplanszy[x][y].pole;
        }
    }
}
function przegrana(){
    alert(`przegrałeś, twój wynik to: ${snake.length} :>`);
    window.location.reload(true);
}
function generatejabubluszka(){
    let pom = 0;
    let posx = Math.floor(Math.random() * elemetyplanszy[0].length);
    let posy = Math.floor(Math.random() * elemetyplanszy.length);
    while(pom < 1){
        posx = Math.floor(Math.random() * elemetyplanszy[0].length);
        posy = Math.floor(Math.random() * elemetyplanszy.length);
        if(elemetyplanszy[posx][posy].pole == 0){
            pom++;
        }
    }
    elemetyplanszy[posx][posy].pole = -1;
    elemetyplanszy[posx][posy].dom.classList.add("jablko");
}
function zjedzeniejablka(snakehead){
    idx = snakehead.posx;
    idy = snakehead.posy;
    elemetyplanszy[idx][idy].dom.classList.remove("jablko");
    elemetyplanszy[idx][idy].pole = 0;
    let positions = {
        posx:idx,
        posy:idy
    }
    snake.push(positions);
    generatejabubluszka();
}
createElements();
move();
generatejabubluszka();