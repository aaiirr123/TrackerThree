import * as THREE from 'three';

export default class SceneInit {
    fov: number;
    camera;
    scene;
    renderer;

    constructor(canvasId : string) {

        this.fov = 45;
        
        this.scene= new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        

        this.renderer = new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true
          });
      
    }

    initialize() {
        this.camera.position.z = 50;
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        this.scene.add(ambientLight);
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        window.addEventListener('resize', () => this.onWindowResize(), false);

    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
      this.renderer?.render(this.scene, this.camera);
    }

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    }

}