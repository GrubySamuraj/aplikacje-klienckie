function drawRandom() {
    let plotno = document.getElementById("plotno");
    let ctx = plotno.getContext("2d");
    let color = "#" + randomColor();
    let randomx = Math.floor(Math.random() * 300);
    let randomy = Math.floor(Math.random() * 300);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(randomx, randomy);
    ctx.stroke();
}
function init() {
    window.setInterval(drawRandom, 20);
    let plotno = document.getElementById("plotno2");
    let ctx = plotno.getContext("2d");
    let interwal;
    plotno2.onmousemove = function (event) {
        ctx.lineWidth = 13;
        ctx.strokeStyle = 'rgba(128, 128, 255, 0.2)';
        ctx.beginPath();
        let r = Math.random() * (2 * Math.PI);
        ctx.arc(event.clientX, event.clientY - 300, 50, r, (Math.PI / 4) + r);
        ctx.stroke();
        clearInterval(interwal)
        interwal = setInterval(function () {
            ctx.lineWidth = 13;
            ctx.strokeStyle = 'rgba(128, 128, 255, 0.2)';
            ctx.beginPath();
            let r = Math.random() * (2 * Math.PI);
            ctx.arc(event.clientX, event.clientY - 300, 50, r, (Math.PI / 4) + r);
            ctx.stroke();
        }, 10);
    }
    dolar();
}
function dolar() {
    let img = document.getElementById("img");
    let plotno = document.getElementById("plotno3");
    let ctx = plotno.getContext("2d");
    let obj = respawn();
    let posx = Math.floor(Math.random() * (plotno.width - img.width));
    let posy = Math.floor(Math.random() * (plotno.height - img.height));
    let kierunekx = obj.kierunek[0];
    let kieruneky = obj.kierunek[1];
    ctx.drawImage(img, posx, posy);
    console.log(obj);
    img.setAttribute("src", obj.img);
    console.log(img);
    let interwal2 = window.setInterval(function () {
        posx = posx + kierunekx;
        posy = posy + kieruneky;
        ctx.clearRect(0, 0, plotno.width, plotno.height);
        ctx.drawImage(img, posx, posy);
        if (posx + img.width >= plotno.width) {
            kierunekx = -kierunekx;
        }
        if (posy + img.height >= plotno.height) {
            kieruneky = -kieruneky;
        }
        if (posx <= 0) {
            kierunekx = -kierunekx
        }
        if (posy <= 0) {
            kieruneky = -kieruneky
        }
        if (posx + img.width >= plotno.width || posy + img.height >= plotno.height || posx <= 0 || posy <= 0) {
            let obj2 = odbicie();
            console.log(obj2);
            img.setAttribute("src", obj2.img);
            // kierunekx = obj2.kierunek;
            // kieruneky = obj2.kierunek;
        }
    }, 20)
}
function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
function odbicie() {
    let imgs = ["./img/DVD_black.png", "./img/DVD_blue.png", "./img/DVD_purple.png"];
    let predkosci = [1, 2, 3];
    let rand3 = Math.floor(Math.random() * 3);
    let predkosc = predkosci[rand3]
    let kierunekx = predkosc;
    let kieruneky = predkosc;
    let kierunki = [[kierunekx, kieruneky], [kierunekx, -kieruneky], [-kierunekx, kieruneky], [-kierunekx, -kieruneky]]
    let rand = Math.floor(Math.random() * 3);
    let rand2 = Math.floor(Math.random() * 3);
    return {
        img: imgs[rand],
        kierunek: predkosc,
    }
}
function respawn() {
    let imgs = ["./img/DVD_black.png", "./img/DVD_blue.png", "./img/DVD_purple.png"];
    let predkosci = [1, 2, 3];
    let rand3 = Math.floor(Math.random() * 3);
    let predkosc = predkosci[rand3]
    let kierunekx = predkosc;
    let kieruneky = predkosc;
    let kierunki = [[kierunekx, kieruneky], [kierunekx, -kieruneky], [-kierunekx, kieruneky], [-kierunekx, -kieruneky]]
    let rand = Math.floor(Math.random() * 3);
    let rand2 = Math.floor(Math.random() * 3);
    return {
        img: imgs[rand],
        kierunek: kierunki[rand2],
    }
}
// function drawArch(event) {
//     let plotno = document.getElementById("plotno2");
//     let ctx = plotno.getContext("2d");
//     ctx.strokeStyle = 'rgba(0, 0, 255, 0.1)';
//     ctx.beginPath();
//     let r = Math.random() * (2 * Math.PI);
//     ctx.arc(event.clientX, event.clientY, 50, r, (Math.PI / 4) + r);
//     ctx.stroke();
// }