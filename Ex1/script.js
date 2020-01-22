var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var prevx = 250;
var prevy = 250;
radiant = Math.PI/2;
var nextx,nexty;
var pendown = true;

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
function parseInput(input) {
    var lines = input.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var commands = lines[i].split(' ');
        console.log(commands[0]);
        switch (commands[0]) {
            case "forward":
                move(commands[1]);
                break;
            case "backwards":
                move(-(commands[1]));
                break;
            case "right":
                changeRadiant(-commands[1]);
                break;
            case "left":
                changeRadiant((commands[1]));
                break;
            case "penup":
                pendown=false;
                break;
            case "pendown":
                pendown=true;
                break;
            case "color":
                ctx.strokeStyle = commands[1];
                break;
        }
    }
}
document.getElementById("button").addEventListener("click", function () {
    parseInput(document.getElementById("textareabox").value);
});
parseInput("color red\n" +
    "forward 100\n" +
    "right 90\n" +
    "forward 100\n" +
    "right 90\n" +
    "forward 100\n" +
    "right 90\n" +
    "forward 100\n" +

    "penup\n" +
    "forward 100\n" +
    "pendown\n" +
    "color green\n" +
    "" +
    "left 60\n" +
    "forward 100\n" +
    "left 120\n" +
    "forward 100\n" +
    "left 120\n" +
    "forward 100\n" +

    "penup\n" +
    "right 30\n" +
    "forward 100\n" +
    "pendown\n" +
    "color blue\n" +


    "forward 50\n" +
    "left 60\n" +
    "forward 50\n" +
    "left 60\n" +
    "forward 50\n" +
    "left 60\n" +
    "forward 50\n" +
    "left 60\n" +
    "forward 50\n" +
    "left 60\n" +
    "forward 50\n" +
    "left 60");


