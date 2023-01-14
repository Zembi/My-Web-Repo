
mainJs();

function mainJs() {
   let scene, gui, camera, renderer, cube;

   let gloablGuiItems = {
      cameraOffsetX: 40,
      cameraOffsetY: 10,
      cameraTarget: 0
   }

   const clock = new THREE.Clock();
   let time = 0;

   Initialize();

   Animate();

   // INTIALIZE CORE ITEMS
   function Initialize() {
      // CREATE THE BASICS
      // SCENE
      scene = new THREE.Scene();

      // CAMERA
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 0, 0);

      // RENDER
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.setClearColor(0x5b5b5b, 0.5);
      let elmntToAppear = document.getElementById('THREEJScanvas');
      elmntToAppear.appendChild(renderer.domElement);


      // OBJECTS APPEARING ON THE CONTENT OF THE SCENE
      // GRID
      const gridHelper = new THREE.GridHelper(150, 100);
      scene.add(gridHelper);


      // AXIS' ARROWS
      const axesHelper = new THREE.AxesHelper(20);
      axesHelper.position.y = 3;
      scene.add(axesHelper);


      // CUBE
      const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
      const weirdTexture = new THREE.TextureLoader().load('Textures/texture1.gif');
      const cubeMaterial = new THREE.MeshBasicMaterial({ map: weirdTexture });

      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.y = 3;
      scene.add(cube);


      // PLANE 
      const planeGeometry = new THREE.PlaneGeometry(150, 100, 10, 50);
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x990, side: THREE.DoubleSide, wireframe: false });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.y = 0;
      scene.add(plane);

      planeGeometry.rotateX(Math.PI / 2);


      // GENERAL 
      renderer.setSize(window.innerWidth, window.innerHeight);

      window.addEventListener('resize', () => {
         OnWindowResize();
      });



      // FINALLY CREATE THE GUI
      let max = 100;

      gui = new dat.GUI();

      const cameraFolder = gui.addFolder('Camera')
      cameraFolder.add(gloablGuiItems, 'cameraOffsetX', 0, max);
      cameraFolder.add(gloablGuiItems, 'cameraOffsetY', 0, max);
      cameraFolder.open();

      const cubeFolder = gui.addFolder('CenterCube')
      cubeFolder.add(cube.scale, 'x', 0, max);
      cubeFolder.add(cube.scale, 'y', 0, max);
      cubeFolder.add(cube.scale, 'z', 0, max);
      cubeFolder.open();

      // console.log(gui);
   }

   // RENDER SO IT CAN BE SHOWED TO THE SCREEN
   function Animate() {
      requestAnimationFrame(Animate);

      Update();

      renderer.render(scene, camera);
   }

   // FRAME UPDATE ACTIONS
   function Update() {
      let cameraSpeed = 0.5;

      clock.getDelta();
      time = clock.elapsedTime.toFixed(2);
      camera.position.x = gloablGuiItems.cameraTarget + gloablGuiItems.cameraOffsetX * (Math.sin(time * cameraSpeed));
      camera.position.z = gloablGuiItems.cameraTarget + gloablGuiItems.cameraOffsetX * (Math.cos(time * cameraSpeed));
      camera.position.y = gloablGuiItems.cameraOffsetY;
      camera.lookAt(gloablGuiItems.cameraTarget, gloablGuiItems.cameraTarget, gloablGuiItems.cameraTarget);
   }

   function OnWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
   }

   ShortCutKeyEvents();
   function ShortCutKeyEvents() {
      document.addEventListener('keydown', (e) => {
         let specialKey = e.altKey;

         if (e.key.toLowerCase() === 'v' && specialKey) {
            gui.__closeButton.click();

            let guiInputs = Array.from(gui.domElement.querySelectorAll('button, input, select'))
            if (!gui.closed) {
               guiInputs.map((option) => {
                  option.tabIndex = '0';
               });
            }
            else {
               guiInputs.map((option) => {
                  option.tabIndex = '-1';
                  option.blur();
               });
            }

            e.preventDefault();
         }
      });
   }
}