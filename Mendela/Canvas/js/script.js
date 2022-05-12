function drawRandom() {
    let plotno = document.getElementById("plotno");
    let ctx = plotno.getContext("2d");
    let color = "#" + randomColor();
    console.log(color);
    let randomx = Math.floor(Math.random() * 300);
    let randomy = Math.floor(Math.random() * 300);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(randomx, randomy);
    ctx.stroke();
}
function init() {
    // let interwal = window.setInterval(drawRandom, 5);
}
function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
function drawArch() {
    let plotno = document.getElementById("plotno2");
    let ctx = plotno.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(300, 300);
    ctx.stroke();
}