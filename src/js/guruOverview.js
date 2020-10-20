import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {sRGBEncoding} from "three";
import Achtergrond from '../sounds/background2.mp3';
//import { SingleEntryPlugin } from 'webpack';

class guruOverview {
    constructor($guruOverview) {
        this.$guruOverview = $guruOverview;

        this.listener()
    }

    listener() {
        var INTERSECTED;
        var speeltAudio = 0;
        var particles,
            _this = this,
            guruOverview = this.$guruOverview,
            height = window.innerHeight,
            width = window.innerWidth,
            scene =  new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 60, width / height, 2, 1000 ),
            light = new THREE.PointLight( 0xffffff, 1 ),
            renderer = new THREE.WebGLRenderer({alpha: true}),
            controls = new OrbitControls(camera, renderer.domElement );
            var AudioElement = document.createElement('audio');
        var raycaster = new THREE.Raycaster(),
            dataGuru;
            var mouse = new THREE.Vector2();
        var mouseX, MouseY, enableclick, Geluid;
        var sceneGurus = []
        controls.update();
        light.shadow.camera.far = 1000;
        scene.background = new THREE.Color( 0xf0f0f0 );
        camera.position.set(0, 0, 200);
        light.position.set( 1, 1, 1 ).normalize();
        //scene.add(new THREE.AmbientLight(0xffffff, 0.2)).add(light);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height);

        guruOverview[0].appendChild(renderer.domElement);

        var vertices = [];
        var material;
        var geometry = new THREE.BufferGeometry();

                //Maak een nieuwe raycaster
                raycaster = new THREE.Raycaster();        
                //Maak de klikregio net zo groot als het scherm

        for ( var i = 0; i < 10000; i ++ ) {

            var x = 2000 * Math.random() - 1000;
            var y = 2000 * Math.random() - 1000;
            var z = 2000 * Math.random() - 1000;

            vertices.push( x, y, z );
        }

        //particles
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        material = new THREE.PointsMaterial( { size: 2, sizeAttenuation: true, alphaTest: 1, transparent: true } );
        material.color = new THREE.Color("rgb(252, 202, 70)");
        particles = new THREE.Points( geometry, material );
        scene.add( particles );

        let gurus = {
            0: [{
                'environment': 7,
            }, {
                'health': 9.2,
            }, {
                'finance': 5,
            }, {
                'height': 0.3999999999,
            }, {
                'width': -2.4000000,
            }, {
                'blue': 7,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            1: [{
                'environment': 6,
            }, {
                'health': 11.2,
            }, {
                'finance': 5,
            }, {
                'height': -6.66,
            }, {
                'width': -0.6,
            }, {
                'blue': 0,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            2: [{
                'environment': 9,
            }, {
                'health': 11.2,
            }, {
                'finance': 4,
            }, {
                'height': -1.8,
            }, {
                'width': -1.9,
            }, {
                'blue': 7,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            3: [{
                'environment': 3,
            }, {
                'health': 8.2,
            }, {
                'finance': 4,
            }, {
                'height': -1,
            }, {
                'width': -2.6,
            }, {
                'blue': 0,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3"]
            }],
            4: [{
                'environment': 7,
            }, {
                'health': 8.2,
            }, {
                'finance': 5,
            }, {
                'height': -0.8,
            }, {
                'width': -3.4,
            }, {
                'blue': 0,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/EM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/AM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3"]
            }],
            5: [{
                'environment': 7,
            }, {
                'health': 9.2,
            }, {
                'finance': 5,
            }, {
                'height': -0.4,
            }, {
                'width': -2.4,
            }, {
                'blue': 7,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            6: [{
                'environment': 8,
            }, {
                'health': 11.2,
            }, {
                'finance': 6,
            }, {
                'height': -1,
            }, {
                'width': -1.2,
            }, {
                'blue': 0,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/CM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/AM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/AM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3"]
            }],
            7: [{
                'environment': 8,
            }, {
                'health': 11.2,
            }, {
                'finance': 4,
            }, {
                'height': -2,
            }, {
                'width': -3.4,
            }, {
                'blue': 180,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/CM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/GM.mp3"]
            }],
            8: [{
                'environment': 8,
            }, {
                'health': 11.2,
            }, {
                'finance': 5,
            }, {
                'height': -1.4,
            }, {
                'width': -1.6,
            }, {
                'blue': 0,
            }, {
                'red': 0,
            }, {
                'sound': ["builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/CM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3","builders/sound/AM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/BM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/CM.mp3","builders/sound/GM.mp3","builders/sound/AM.mp3","builders/sound/EM.mp3"]
            }],
            9: [{
                'environment': 8,
            }, {
                'health': 12.2,
            }, {
                'finance': 5,
            }, {
                'height': -1.2,
            }, {
                'width': -1.8,
            }, {
                'blue': 255,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            10: [{
                'environment': 8,
            }, {
                'health': 12.2,
            }, {
                'finance': 5,
            }, {
                'height': -1.2,
            }, {
                'width': -1.8,
            }, {
                'blue': 6,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3"]
            }],
            11: [{
                'environment': 8,
            }, {
                'health': 10.2,
            }, {
                'finance': 5,
            }, {
                'height': -.6,
            }, {
                'width': -1.8,
            }, {
                'blue': 140,
            }, {
                'red': 145,
            }, {
                'sound': ["builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/EV.mp3","builders/sound/BV.mp3","builders/sound/CV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/GV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/CV.mp3","builders/sound/CV.mp3","builders/sound/AV.mp3","builders/sound/EV.mp3","builders/sound/AV.mp3","builders/sound/CV.mp3"]
            }],
        }

        // make a guru out of the database answerData

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

            guruObject.position.x = 50 + (Math.floor( Math.random() * 400));
            guruObject.position.y = 200 - (Math.floor(Math.random() * 300));
            guruObject.position.z = 40 + Math.floor(- Math.random() * 300);
            guruObject.userData = {Sound: guru[7]};
            scene.add(guruObject);
            sceneGurus.push(guruObject);
        }

        document.body.addEventListener( 'pointermove', onPointerMove, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        window.addEventListener( 'resize', onWindowResize, false );

        // click on gurus
        var onMouseClick;
        var onMouseClick = (event) => {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );

            var intersects = raycaster.intersectObjects(sceneGurus, true);
            if (intersects.length > 0) {
                if (intersects[0].object != INTERSECTED) {
                    INTERSECTED = intersects[0].object;
                    Geluid = INTERSECTED.userData.Sound.sound;
                    Geluid.forEach((item, i) => {
                        setTimeout(function () {
                            var AudioElement = document.createElement('audio');
                            AudioElement.setAttribute('src', item);
                            AudioElement.play();
                            }, i * 200);
                        })
                    }
                    } else // there are no intersections
                    {
            }
        }
        
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.03;
        window.addEventListener( 'mousedown', onMouseClick, true);
        window.addEventListener( 'resize', onWindowResize, false );

        function onWindowResize() {
            const _this = $(this);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function onDocumentMouseMove( event ) {
            const _this = $(this);
    
            event.preventDefault();
    
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        }

        function onPointerMove( event ) {

            if ( event.isPrimary === false ) return;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            var mouseX = event.clientX - windowHalfX;
            var mouseY = event.clientY - windowHalfY;
    }

        animate();
        function animate() {
            camera.updateMatrixWorld();
            requestAnimationFrame( animate );
            controls.update();
            update();
            renderer.render( scene, camera );
        }

        function update() {
            // find intersections
            // create a Ray with origin at the mouse position
            //   and direction into the scene (camera direction)
            var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
            vector.unproject(camera);
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
          
            // create an array containing all objects in the scene with which the ray intersects
            var intersects = ray.intersectObjects(sceneGurus, true);
            // INTERSECTED = the object in the scene currently closest to the camera 
            //		and intersected by the Ray projected from the mouse position 	
            // if there is one (or more) intersections
            if (intersects.length > 0) {
                $('html,body').css('cursor', 'pointer');
            } else {
                $('html,body').css('cursor', 'default');
            }
        }

    }
}

export default(() => {
    $('.guru-overview').each(function () {
        new guruOverview($(this));
    })
})