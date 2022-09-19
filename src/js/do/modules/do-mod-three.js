var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dothree"] = function () {

    let manager = new ThreeManager();
    

};

window.WFmodules = moduleManager;


class ThreeManager {


    
    constructor(){

        if(ThreeManager.instance instanceof ThreeManager){

            return ThreeManager.instance;
        }

        let container;
        let camera;
        let controls;
        let renderer;
        let scene;
        let mesh;

        function init() {

            container = document.querySelector('#scene-container');
           
            // create a Scene
            scene = new THREE.Scene();
           
            // Set the background color
            scene.background = new THREE.Color('blue');
           
            createCamera();
            createControls();
            createLights();
            createMeshes();
            createRenderer();
           
            // start the animation loop
            renderer.setAnimationLoop(() => {
           
            update();
            render();
           
               });
           }


        function createCamera() {

            camera = new THREE.PerspectiveCamera(
            35, // FOV
            container.offsetWidth / container.offsetHeight, // aspect
           
            0.1, // near clipping plane
            100, // far clipping plane
               );
           
            camera.position.set(0, 0, 30);
           
           
           }
           
           function createControls() {
           
            //controls = new THREE.OrbitControls( camera, container );
           
           }
           
           function createLights() {
           
            const ambientLight = new THREE.HemisphereLight(
            0xddeeff, 
            0x200020, 
            3, 
               );
           
            scene.add(ambientLight);
           
           }
           
           function createMeshes() {

            var groundTexture = new THREE.TextureLoader().load( '../../imgs/photos/surf.png' );
         
           // groundTexture.anisotropy = 0;
            //groundTexture.encoding = THREE.sRGBEncoding;

            var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

			mesh = new THREE.Mesh(  new THREE.PlaneGeometry( 30, 30 ), groundMaterial );
			//mesh.position.y = 0.0;
			//mesh.rotation.x = - Math.PI / 2;
			//mesh.receiveShadow = true;
			scene.add( mesh );
           
      
           
            //mesh = new THREE.Mesh(geometry, material);
           
            //scene.add(mesh);
           
           }
           
           function createRenderer() {
           
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
           
            renderer.setPixelRatio(window.devicePixelRatio);
           
            renderer.gammaFactor = 1;
            renderer.gammaOutput = true;
           
            renderer.physicallyCorrectLights = true;
           
           
           container.appendChild(renderer.domElement);
           
           }
           
           // perform any updates to the scene, called once per frame
           // avoid heavy computation here
           function update() {
           
            // increase the mesh's rotation each frame
            mesh.rotation.z += 0.0001;
            mesh.position.z += 0.01;
            //mesh.rotation.x += 0.01;
            //mesh.rotation.y += 0.01;
           
           }
           // render, or 'draw a still image', of the scene
           function render() {
           
            renderer.render(scene, camera);
           
           }
           
           function onWindowResize() {
           
            console.log('You resized the browser window!');
            // set the aspect ratio to match the new browser window aspect ratio
            camera.aspect = container.offsetWidth / container.offsetHeight;
           
            // update the camera's frustum
            camera.updateProjectionMatrix();
           
            renderer.setSize(container.offsetWidth, container.offsetHeight);
           }
           
           window.addEventListener('resize', onWindowResize);
           
           init();

 

        ThreeManager.instance = this;
        return this;

    }


}
