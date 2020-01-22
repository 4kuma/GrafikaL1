var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

var x1 = 0;
var y1 = 0;
var z1 = 0;
var alpha = 0;
var beta = 0;

let geometry1 = new THREE.BoxBufferGeometry( 250, 250, 250 );
let edges = new THREE.EdgesGeometry( geometry1 );
let cube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
scene.add( cube );




function changeAlpha(value) {
    var deg = value%360;
    alpha += ((deg*Math.PI)/180)%Math.PI;
}
function changeBeta(value) {
    var deg = value%360;
    beta += ((deg*Math.PI)/180)%Math.PI;
}
material = new THREE.LineBasicMaterial({color: 0xff0000});
function move(value){
    var x2=value*(Math.sin(alpha))*(Math.cos(beta))+x1;
    var y2=value*(Math.cos(alpha))*(Math.cos(beta))+y1;
    // *(Math.cos(beta));
    var z2=value*(Math.sin(beta))+z1;
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x1,y1,z1));
    geometry.vertices.push(new THREE.Vector3(x2,y2,z2));
    scene.add(new THREE.Line(geometry,material));
    x1=x2;
    y1=y2;
    z1=z2;
}
document.getElementById("button").addEventListener("click", function() {
    var input = document.getElementById("textareabox").value;
    var lines = input.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var commands = lines[i].split(' ');
        switch (commands[0]) {
            case "forward":
                move(commands[1]);
                break;
            case "backwards":
                move(-(commands[1]));
                break;
            case "right":
                changeAlpha(commands[1]);
                break;
            case "left":
                changeAlpha((-commands[1]));
                break;
            case "up":
                changeBeta(commands[1]);
                break;
            case "down":
                changeBeta(-commands[1]);
                break;
            case "penup":
                // pendown=false;
                break;
            case "pendown":
                // pendown=true;
                break;
            case "color":
                material.color.set(commands[1]);
                break;
        }
    }
});



camera.position.z = 400;
document.addEventListener('keydown', (e)=>{
    if(e.code === "ArrowUp") scene.rotation.x-=0.1;
    else if(e.code ==="ArrowDown") scene.rotation.x+=0.1;
    else if(e.code ==="ArrowRight") scene.rotation.y+=0.1;
    else if(e.code ==="ArrowLeft") scene.rotation.y-=0.1;
    else if(e.code ==="KeyW") camera.position.z-=1;
    else if(e.code ==="KeyS") camera.position.z+=1;

});
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();