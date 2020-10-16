import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {sRGBEncoding} from "three";

class guruOverview {
    constructor($guruOverview) {
        this.$guruOverview = $guruOverview;

        this.listener()
    }

    listener() {
        const _this = this,
            guruOverview = this.$guruOverview,
            height = window.innerHeight,
            width = window.innerWidth,
            scene =  new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 100, width / height, 2, 1000 ),
            light = new THREE.DirectionalLight( 0xffffff, 0.35 ),
            renderer = new THREE.WebGLRenderer({alpha: true}),
            controls = new OrbitControls(camera, renderer.domElement );

        controls.update();

        scene.background = new THREE.Color( 0xf0f0f0 );
        camera.position.set(0, 0, 250);
        light.position.set( 1, 1, 1 ).normalize();
        scene.add(new THREE.AmbientLight(0xffffff, 1.0)).add(light);
        renderer.setSize(width, height);

        guruOverview[0].appendChild(renderer.domElement);

        animate();
        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }

        console.log(scene);

        let gurus = {
            1: [{
                'environment': Math.floor(Math.random() * 10),
            },{
                'health': Math.floor(Math.random() * 10),
            },{
                'finance': (Math.random() * (1.2 - 12) + 12).toFixed(1),
            },{
                'height': Math.floor(Math.random() * 5),
            },{
                'width': Math.floor(Math.random() * 5),
            },{
                'blue': Math.floor(Math.random() * 255),
            },{
                'red': Math.floor(Math.random() * 255),
            }],
            2: [{
                'environment': Math.floor(Math.random() * 10),
            },{
                'health': Math.floor(Math.random() * 10),
            },{
                'finance': (Math.random() * (1.2 - 12) + 12).toFixed(1),
            },{
                'height': Math.floor(Math.random() * 5),
            },{
                'width': Math.floor(Math.random() * 5),
            },{
                'blue': Math.floor(Math.random() * 255),
            },{
                'red': Math.floor(Math.random() * 255),
            }],
            3: [{
                'environment': Math.floor(Math.random() * 10),
            },{
                'health': Math.floor(Math.random() * 10),
            },{
                'finance': (Math.random() * (1.2 - 12) + 12).toFixed(1),
            },{
                'height': Math.floor(Math.random() * 10),
            },{
                'width': Math.floor(Math.random() * 10),
            },{
                'blue': Math.floor(Math.random() * 255),
            },{
                'red': Math.floor(Math.random() * 255),
            }]
        }

        console.log(gurus);

        for (let i in gurus) {
            let guru = gurus[i],
                environment = guru[0].environment,
                guruRotation = environment * 0.01,
                health = guru[1].health,
                finance = guru[2].finance,
                green = parseInt(((finance * 255) / 6).toFixed(0)),
                height = guru[3].height,
                width = guru[4].width,
                blue = guru[5].blue,
                red = guru[6].red,
                geometry = new THREE.SphereGeometry( 5, width, height ),
                material = new THREE.MeshBasicMaterial( {color: 'rgb(' + red + ',' + green + ',' + blue + ')'} ),
                guruObject = new THREE.Mesh(geometry,material);
            geometry.elementsNeedUpdate = true;

            guruRotate();
            function guruRotate() {
                requestAnimationFrame(guruRotate);
                guruObject.rotation.x += guruRotation;
                guruObject.rotation.y += guruRotation;
                controls.update();
                renderer.render( scene, camera );
            }

            guruObject.material.opacity  = health / 12;

            guruObject.scale.set(width,height,2);

            guruObject.position.x = Math.floor(Math.random() * 250);
            guruObject.position.y = Math.floor(Math.random() * 250);
            guruObject.position.z = Math.floor(Math.random() * 250);


            scene.add(guruObject);
        }

    }
}

export default(() => {
    $('.guru-overview').each(function () {
        new guruOverview($(this));
    })
})