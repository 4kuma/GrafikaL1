var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var prevx = 499;
var prevy = 1;
radiant = Math.PI/2;
var nextx,nexty;
var pendown = true;
var step;

var width = canvas.width;

function move(value){
    nextx = (value*(Math.cos(radiant)))+prevx;
    nexty = canvas.height-((value*(Math.sin(radiant)))+prevy);

    if(pendown) {
        ctx.beginPath();
        ctx.moveTo(prevx, canvas.height - prevy);
        ctx.lineTo(nextx, nexty);
        ctx.stroke();
        prevx = nextx;
        prevy = canvas.height - nexty;
    }
    else{
        prevx = nextx;
        prevy = canvas.height - nexty;
    }
}
function changeRadiant(value){
    var deg = value%360;
    radiant += ((deg*Math.PI)/180)%Math.PI;
}
function A(a,b,n) {
    if(n===0){
        return;
    }
    changeRadiant(90);
    b(a, b, n - 1);
    move(step);
    changeRadiant(-90);
    a(a, b, n - 1);
    move(step);
    a(a, b, n - 1);
    changeRadiant(-90);
    move(step);
    b(a, b, n - 1);
    changeRadiant(90);
}
function B(a,b,n){
    if(n===0){
        return;
    }
    changeRadiant(-90);
    a(a, b, n - 1);
    move(step);
    changeRadiant(90);
    b(a, b, n - 1);
    move(step);
    b(a, b, n - 1);
    changeRadiant(90);
    move(step);
    a(a, b, n - 1);
    changeRadiant(-90)
}
var clearScreen= function(ctx, bgColorString) {
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle=bgColorString;
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height );
}
function drawHilbert() {
    clearScreen(ctx,"WHITE");
    prevx = 499;
    prevy = 1;
    radiant = Math.PI/2;
    var i=document.getElementById("degree").value;
    step = canvas.width/(Math.pow(2,i));
    console.log((2^(i-1)));
    A(A,B,i);
}
document.getElementById("button").addEventListener("click", drawHilbert);

