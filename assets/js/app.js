//---------------Display---------------
//Camera & Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
let player = { height:50, speed:0.2, turnSpeed:Math.PI*0.02 };
scene.background = new THREE.TextureLoader().load("assets/textures/bg2.jpg");
scene.rotation.x = -0.20;
camera.position.set(0,0, 5);

//Renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls (camera, renderer.domElement);


//---------------Drawables---------------
//Roller Coaster (Background)
let loader = new THREE.GLTFLoader();
let spotlight1 = new THREE.PointLight(0xE4892C, 1);
spotlight1.position.set(-10, -20, -300);
loader.load( 'assets/model/rollercoaster/scene.gltf', function ( gltf ) {
    gltf.scene.position.z = -300;
    gltf.scene.position.y = -40;
    gltf.scene.rotation.y = 2;
    gltf.scene.scale.set(2,1.5,2);
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//Houses (Background)
let house, spotlight;
for (i = -150; i < 450; i+= 15){
    house = function(){
        this.mesh = new THREE.Object3D();
        let houseVar = this.mesh;
        let loader = new THREE.GLTFLoader();
        loader.load( 'assets/model/house/scene.gltf', function ( gltf ) {
            gltf.scene.scale.set(0.1,0.08,0.1);
            gltf.scene.rotation.y += Math.PI / 2;
            gltf.scene.rotation.y += Math.PI / 2;
            houseVar.add(gltf.scene);;
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
    houseMesh = new house();
    houseMesh.mesh.position.x = i;
    houseMesh.mesh.position.z = -350;
    houseMesh.mesh.position.y = -37;
    spotlight = new THREE.PointLight(0xE4892C, 0.02);
    spotlight.position.set(i, 0, -300);
    scene.add(spotlight);
    scene.add(houseMesh.mesh);
}

//Boat House (Background)
loader = new THREE.GLTFLoader();
loader.load( 'assets/model/boathouse/scene.gltf', function ( gltf ) {
    gltf.scene.position.z = -400;
    gltf.scene.position.y = -40;
    gltf.scene.position.x = -350;
    gltf.scene.scale.set(0.1,0.03,0.03);
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//Ferris Wheel (Background)
loader = new THREE.GLTFLoader();
loader.load( 'assets/model/ferris/scene.gltf', function ( gltf ) {
    gltf.scene.position.z = -400;
    gltf.scene.position.y = -40;
    gltf.scene.position.x = -120;
    gltf.scene.scale.set(5,5,5);
    scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//People (Background)
for (i = 0; i < 20; i++){
    loader = new THREE.GLTFLoader();
    loader.load( 'assets/model/people/scene.gltf', function ( gltf ) {
        gltf.scene.position.z = -(Math.random() * (100 - 50) + 50);
        gltf.scene.position.x = Math.random() * (200 - (-100)) + (-100);
        gltf.scene.rotation.y = -(Math.random() * (200 - 50) + 50);
        gltf.scene.position.y = -22;
        gltf.scene.scale.set(0.03,0.03,0.03);
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

//Sand (Geometry Plane)
gridSize = 75;
worldWidth = 650;
worldHeight = 300;
geometry = new THREE.PlaneGeometry(worldWidth, worldHeight, gridSize - 1, gridSize - 1);
geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-(Math.PI / 2)));


//Terrain Mapping
data = [];
var highestPoint = 0;
var inc = 0;
for (var x = 0; x < gridSize; x++) {
    data.push([]);
    for (var y = 0; y < gridSize; y++) {
        data[x].push(getval(x));
        geometry.vertices[inc].y = data[x][y];
        if (data[x][y] > highestPoint) highestPoint = data[x][y];
        inc++;
    }
}

terrain = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color:0xFFE2C4}));
terrain.position.y = -30;
terrain.position.z = -75;
scene.add(terrain);


//Uneven Terrain
function getval(x) {
    var val = 0;
    val = Math.random() * 6;
    val += (Math.sin((x * 2) / gridSize) * 5);
    return val;
}


gridSize = 10;
worldWidth = 2500;
worldHeight = 700;
geometry = new THREE.PlaneGeometry(worldWidth, worldHeight, gridSize - 1, gridSize - 1);
geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-(Math.PI / 2)));


//Terrain Mapping
data = [];
var highestPoint = 0;
var inc = 0;
for (var x = 0; x < gridSize; x++) {
    data.push([]);
    for (var y = 0; y < gridSize; y++) {
        data[x].push(getval1(x));
        geometry.vertices[inc].y = data[x][y];
        if (data[x][y] > highestPoint) highestPoint = data[x][y];
        inc++;
    }
}

mountain = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color:0xFFE2C4}));
mountain.position.y = -150;
mountain.position.z = -1000;
scene.add(mountain);


//Uneven Terrain
function getval1(x) {
    var val = 0;
    val = Math.random() * 200;
    val += (Math.sin((x * 2) / gridSize) * 5);
    return val;
}



//Bulk Land under the Trees
const points = [];
for (let i = 0; i < 10; ++i) {
  points.push(new THREE.Vector2(Math.sin(i * 0.2) * 20 + 20, (i - 5) * .8));
}
let bulkLand = new THREE.Mesh(new THREE.LatheBufferGeometry(points), new THREE.MeshLambertMaterial({color:0xFFE2C4}));
bulkLand.applyMatrix(new THREE.Matrix4().makeRotationX(3));
bulkLand.position.set(120,-22,-150);
scene.add(bulkLand);


//Trees
let triangle, tree, extrude, treeHair;
let height = [120, 170, 150, 200, 180, 160];
let width = [95, 110, 120, 135, 145, 160];

for (i = 0; i < height.length; i++){
    treeHair = function(){
        this.mesh = new THREE.Object3D();
        this.mesh.name = "tree";
        for (x = 0; x < 20; x++){
            triangle = new THREE.Mesh(new THREE.ConeBufferGeometry(3, height[i]/6, 16), new THREE.MeshLambertMaterial({color:0x196F3D}));
            triangle.rotation.z = x - 2;
            triangle.position.y = Math.sin(x) * 10;
            triangle.position.x = Math.cos(x) * 10;
            this.mesh.add(triangle);
        }
    }
    
    tree = new treeHair();
    tree.mesh.position.set(width[i], height[i]/2, -150)
    scene.add(tree.mesh);
    tree = new treeHair();
    tree.mesh.position.set(width[i], height[i]/3, -150)
    scene.add(tree.mesh);
    extrude = new THREE.Mesh(new THREE.CylinderGeometry( 3, 3, height[i], 32 ), new THREE.MeshLambertMaterial({color:0x7E5109}));
    extrude.position.set(width[i], 0, -150);
    scene.add(extrude);
}


//---------------Lightings---------------
let ambient = new THREE.AmbientLight(0x000032, 1.2);
scene.add(ambient);

const color = 0xE4892C;
const intensity = 3.5;
const light = new THREE.SpotLight(color, intensity, 100000);
light.position.set(0, 5, -700);
scene.add(light);

const helper = new THREE.SpotLightHelper(light);
scene.add(helper);


//---------------Animation---------------
function animate() {
    controls.update();
    requestAnimationFrame( animate );


    renderer.render( scene, camera );
}


animate();