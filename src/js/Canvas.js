import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
// import { TweenMax, TimelineMax } from "gsap/all";
import {AmbientLight} from "three";
import Questions from "././Questions";

class Canvas {
    constructor($Canvas) {
        this.$canvas = $Canvas;
        this.$question = this.$canvas.find('.question');
        this.listener();
    }

    listener() {
        const canvas = this.$canvas,
            question = this.$question;

        var camera, scene, raycaster, renderer, stats;

        var mouse = new THREE.Vector2(), INTERSECTED;
        var radius = 100, theta = 0;
        var objects = [];
        init();
        animate();

        function init() {
            const _this = $(this);

            var array_buffer = null;

            camera = new CinematicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.setLens( 5 );
            camera.position.set( 2, 1, 500 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

            var light = new THREE.DirectionalLight( 0xffffff, 0.35 );
            light.position.set( 1, 1, 1 ).normalize();
            scene.add( light );

            //Import glb
            var loader = new GLTFLoader();

            // Hier voegen wij een model toe
            loader.load( 'src/assets/models/deur-merged.glb', function ( object ) {
                    var deur = object.scene;

                    deur.scale.x = 50;
                    deur.scale.y = 50;
                    deur.scale.z = 50;

                    deur.position.x = Math.random() * 800 - 400;
                    deur.position.y = Math.random() * 800 - 400;
                   deur.position.z = Math.random() * 800 - 400;
                    
                    scene.add( deur);
                    objects.push(deur);
                },
                // called while loading is progressing
                function ( xhr ) {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                // called when loading has errors
                function ( error ) {
                    console.log( 'An error happened' );
                }
            );

            loader.load( 'src/assets/models/Douche.glb', function ( object ) {
                var douche = object.scene;

                douche.scale.x = 50;
                douche.scale.y = 50;
                douche.scale.z = 50;

                douche.position.x = Math.random() * 800 - 400;
                douche.position.y = Math.random() * 800 - 400;
                douche.position.z = Math.random() * 800 - 400;
                scene.add( douche);
                objects.push(douche);
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );

            // loader.parse(array_buffer, '', gltf => {
            //     scene.add(gltf.scene);
            //     gltf.scene.name = "Name of Glb File";
            //     gltf.scene.scale.set(5, 5, 5);
            //     renderer.render(this.scene, this.camera);
            // }, error => {
            //     console.log(error);
            // });

            // three js example
            raycaster = new THREE.Raycaster();


            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            stats = new Stats();
            document.body.appendChild( stats.dom );

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );

            window.addEventListener( 'resize', onWindowResize, false );

            //console.log(glb);
            console.log(objects);

            const onMouseClick = (event) => {
                // calculate mouse position in normalized device coordinates
                // (-1 to +1) for both components
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                // update the picking ray with the camera and mouse position
                raycaster.setFromCamera( mouse, camera );
                var intersects = raycaster.intersectObjects( objects, true );
                console.log(intersects)

                intersects.map((rayobject) => {
                    if (rayobject.object.name.includes("deur")) {
                        Questions();
                        question.addClass('AskName')
                        question.show();
                    } else if (rayobject.object.name.includes("douche")) {
                        Questions();
                        question.addClass('douche');
                        question.show();
                    }
                })
            }

            window.addEventListener( 'mousedown', onMouseClick, true);
            // renderer.domElement.addEventListener('click', onClick, false);

            var effectController = {

                focalLength: 15,
                // jsDepthCalculation: true,
                // shaderFocus: false,
                //
                fstop: 2.8,
                // maxblur: 1.0,
                //
                showFocus: false,
                focalDepth: 3,
                // manualdof: false,
                // vignetting: false,
                // depthblur: false,
                //
                // threshold: 0.5,
                // gain: 2.0,
                // bias: 0.5,
                // fringe: 0.7,
                //
                // focalLength: 35,
                // noise: true,
                // pentagon: false,
                //
                // dithering: 0.0001

            };

            var matChanger = function ( ) {

                for ( var e in effectController ) {

                    if ( e in camera.postprocessing.bokeh_uniforms ) {

                        camera.postprocessing.bokeh_uniforms[ e ].value = effectController[ e ];

                    }

                }

                camera.postprocessing.bokeh_uniforms[ 'znear' ].value = camera.near;
                camera.postprocessing.bokeh_uniforms[ 'zfar' ].value = camera.far;
                camera.setLens( effectController.focalLength, camera.frameHeight, effectController.fstop, camera.coc );
                effectController[ 'focalDepth' ] = camera.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;

            };

            //

            var gui = new GUI();

            gui.add( effectController, 'focalLength', 1, 135, 0.01 ).onChange( matChanger );
            gui.add( effectController, 'fstop', 1.8, 22, 0.01 ).onChange( matChanger );
            gui.add( effectController, 'focalDepth', 0.1, 100, 0.001 ).onChange( matChanger );
            gui.add( effectController, 'showFocus', true ).onChange( matChanger );

            matChanger();

            window.addEventListener( 'resize', onWindowResize, false );

        }

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

        function animate() {

            requestAnimationFrame( animate, renderer.domElement );

            render();
            stats.update();

        }


        function render() {

            theta += 0.1;

            //camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            //camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
            //camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
            camera.lookAt( scene.position );

            camera.updateMatrixWorld();

            // find intersections

            raycaster.setFromCamera( mouse, camera );

            var intersects = raycaster.intersectObjects( scene.children );

            if ( intersects.length > 0 ) {

                var targetDistance = intersects[ 0 ].distance;

                camera.focusAt( targetDistance ); // using Cinematic camera focusAt method

                if ( INTERSECTED != intersects[ 0 ].object ) {

                    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                    INTERSECTED = intersects[ 0 ].object;
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex( 0xff0000 );

                }

            } else {

                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                INTERSECTED = null;

            }

            //

            if ( camera.postprocessing.enabled ) {

                camera.renderCinematic( scene, renderer );

            } else {

                scene.overrideMaterial = null;

                renderer.clear();
                renderer.render( scene, camera );

            }

        }
    }
}

export default(() => {
    $('.canvas').each(function() {
        new Canvas($(this));
    });

})