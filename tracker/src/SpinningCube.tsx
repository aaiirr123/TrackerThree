import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Material } from 'three';
import { randFloat } from 'three/src/math/MathUtils';
import SceneInit from './threeJS/SceneInit';

function SpinningCube() {

    const mountRef = useRef<HTMLDivElement>(null);
    const boxGeometry = new THREE.BoxGeometry(10,10,10);
    const boxMaterial = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
     
    let spheres = createSpheres()
    spheres.forEach((sphere) =>  boxMesh.add(sphere))

    useEffect(() : any => {
        
        const test = new SceneInit('threeCanvas');
        test.initialize();
              
        test.scene.add(boxMesh);

        if (mountRef.current)
        {
          mountRef.current.appendChild(test.renderer.domElement);
        }

        let fader = new fade(boxMaterial);

        const animate = () =>
        {
          requestAnimationFrame(animate);
          fader.randomFade();
          boxMesh.rotateX(0.008);
          boxMesh.rotateY(0.0065);
          boxMesh.rotateZ(0.006)
          test.render();
        };
        
        animate();

        if (mountRef.current == null)
        {
          return console.error();
        }

        return () => {    

          if (mountRef.current)
          {
            mountRef.current.removeChild( test.renderer.domElement);
          }
        }
       
      }, []);

    return (
      <div ref={mountRef}>
        <h1>3Js</h1>
      </div>
    )
}

function createBall(radius: number, x_offset: number,
   y_offset: number, z_offset: number) : THREE.Mesh
{
        const ballGeo = new THREE.SphereGeometry(1, 30, 30);
        const ballMat = new THREE.MeshNormalMaterial();
        const sphereMesh = new THREE.Mesh(ballGeo, ballMat);
        sphereMesh.position.x += x_offset;
        sphereMesh.position.y += y_offset;
        sphereMesh.position.z += z_offset;

        return sphereMesh
}

class fade
{
  material: Material;
  fadeIn: boolean = true;
  
  constructor(mat : Material)
  {
    this.material = mat;
  }

  randomFade() {
    if (this.material.opacity >= 1)
    {
      this.fadeIn = false;
    }

    if (this.material.opacity <= 0.6)
    {
      this.fadeIn = true;
    }

    if (this.fadeIn)
    {
      this.material.opacity += randFloat(0, 0.01)
    }
    else
    {
      this.material.opacity += randFloat(0, -0.01)
    }

  }

}

function createSpheres() {
  
  let sphereOne : THREE.Mesh = createBall(1, 10, 0, 0);
  let sphereTwo : THREE.Mesh = createBall(1, -10, 0, 0);
  let sphereThree : THREE.Mesh = createBall(1, 0, 10, 0);
  let sphereFour : THREE.Mesh = createBall(1, 0, -10, 0);
  let sphereFive : THREE.Mesh = createBall(1, 0, 0, 10);
  let sphereSix : THREE.Mesh = createBall(1, 0, 0, -10);
  
  return [
    sphereOne, sphereTwo, sphereThree, 
    sphereFour, sphereFive, sphereSix
  ]
}

export default SpinningCube

