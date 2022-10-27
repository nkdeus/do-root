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

        let images = ["i1.png","i2.png","i3.png","i4.png","i5.png"];
        let mats = [];
        let indexSlide = 0;
        let maxSlide = images.length-1;

        let container;
        let camera;
        let controls;
        let renderer;
        let scene;
        let mesh;
        let meshBack;

        function init() {

            container = document.querySelector('#scene-container');
           
            // create a Scene
            scene = new THREE.Scene();
           
            // Set the background color
            scene.background = new THREE.Color('black');
           
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

               //gsap.ticker.add(render);


               /*

                gsap.to(camera, {
                zoom: 0.5,
                duration: 10,
                scrollTrigger: {
                    trigger: "body",
                    start: 0,
                    end: "bottom bottom",
                    scrub: 2
                },
                ease: 'none',
                onUpdate: function () {
                    camera.updateProjectionMatrix();
                }
                });*/
                mesh.material.transparent = true
            
        }


        function createCamera() {

            camera = new THREE.PerspectiveCamera(
            35, // FOV
            container.offsetWidth / container.offsetHeight, // aspect
           
            0.1, // near clipping plane
            100, // far clipping plane
               );
           
            camera.position.set(0, 0, 100);
           
           
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

           function nextSlide(){

                TweenMax.to(mesh.material, 3, { opacity: 0 ,onComplete:function(){
                    nextSlide();
                } });

                console.log(mesh.material.map);
                indexSlide++;
                //alert(indexSlide);

           }

           
           function createMeshes() {


 

            function creatMat(img, index, array) {
                console.log("a[" + index + "] = " + img);
                var imgurl = '../../imgs/three/'+img;
                var groundTexture = new THREE.TextureLoader().load( imgurl );
                mats.push(groundTexture);
            }
            images.forEach(creatMat);

            
         
           // groundTexture.anisotropy = 0;
            //groundTexture.encoding = THREE.sRGBEncoding;

            

            var groundMaterialBack = new THREE.MeshStandardMaterial( { map: mats[indexSlide] } );
            var groundMaterial = new THREE.MeshStandardMaterial( { map: mats[indexSlide+1] } );

			mesh = new THREE.Mesh(  new THREE.PlaneGeometry( 160, 90 ), groundMaterial );
            meshBack = new THREE.Mesh(  new THREE.PlaneGeometry( 160, 90 ), groundMaterial );
            mesh.position.z = 0;
            meshBack.position.z = 1;

			//mesh.position.y = 0.0;
			//mesh.rotation.x = - Math.PI / 2;
			//mesh.receiveShadow = true;
			scene.add( mesh );

            nextSlide();
           
      
           
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
            //mesh.rotation.z += 0.0001;
            //mesh.position.z += 0.01;
            //mesh.rotation.y += 0.001;
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
