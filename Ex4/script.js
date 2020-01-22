var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

var sphere;
var objects=[];

function createArray(val){
    var arr = [];
    for(let i=0;i<val;i++){
        arr[i]=i;
    }
    return arr;
}
let haha=[-0.5,0.5];
function createBoard(val){
    let geometry1 = new THREE.BoxBufferGeometry( 2, 2, 20 );
    let edges = new THREE.EdgesGeometry( geometry1 );
    let cube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
    cube.position.x=0;
    cube.position.y=0;
    cube.position.z=0;
    scene.add( cube );

}
function createObstacles(val,arr){
    for(let i=0;i<20;i+=2){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );

        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
        var cube2 = new THREE.Mesh( geometry, material );
            cube2.position.x=-haha[Math.round(Math.random() * 1)];
            cube2.position.y=0.5;
            cube2.position.z=i-10;
            scene.add( cube2 );
        objects.push({x:cube2.position.x,y:cube2.position.y,z:cube2.position.z});
        var cube3 = new THREE.Mesh( geometry, material );
        cube3.position.x=haha[Math.round(Math.random() * 1)];
        cube3.position.y=-0.5;
        cube3.position.z=i-10;
        scene.add( cube3 );
        objects.push({x:cube3.position.x,y:cube3.position.y,z:cube3.position.z});
    }
}
function createPlayer() {
    var geometry = new THREE.SphereGeometry(0.05,32,32);
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    sphere = new THREE.Mesh( geometry, material );
    sphere.position.z=9.5;
    scene.add( sphere );
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function resetGame(){
    objects=[];
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    createBoard(10);
    createObstacles(7,shuffle(createArray(14)));
    createPlayer();
    camera.position.z=10;
    camera.position.x=0;
    camera.position.y=0;
}

camera.position.z = 10;
document.addEventListener('keydown', (e)=>{
    if(e.code === "ArrowUp") {camera.position.y+=0.1;
        sphere.position.y+=0.1;}
    if(e.code ==="ArrowDown")  {camera.position.y-=0.1;
        sphere.position.y-=0.1;}
    if(e.code ==="KeyW") {camera.position.z-=0.1;
        sphere.position.z-=0.1;}
    if(e.code ==="KeyS") {camera.position.z+=0.1;
        sphere.position.z+=0.1;}
    if(e.code ==="KeyA") {camera.position.x-=0.1;
        sphere.position.x-=0.1;}
    if(e.code ==="KeyD") {camera.position.x+=0.1;
        sphere.position.x+=0.1;}

});
function checkWinCondition(){
    if(sphere.position.z+0.05<-10){
        resetGame();
    }
}
function checkLoseConditions() {
    if(sphere.position.x+0.05>1 || sphere.position.x-0.05<-1 ||sphere.position.y+0.05>1 ||sphere.position.y-0.05<-1){
        resetGame();
    }
    objects.forEach(function (object) {
        if((sphere.position.z+0.05<=object.z+0.5 && sphere.position.z+0.05>=object.z-0.5)
            && ((object.x===0.5
                && sphere.position.x+0.05>0)
                ||(object.x===-0.5
                    && sphere.position.x-0.05<0))
            &&((object.y===0.5
                &&sphere.position.y+0.05>0)
            ||(object.y===-0.5
                    && sphere.position.y-0.05<0))){
            resetGame();
        }
    })
}
function animate() {

    checkWinCondition();
    checkLoseConditions();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
createBoard(10);
createObstacles(7,shuffle(createArray(14)));
createPlayer();
animate();