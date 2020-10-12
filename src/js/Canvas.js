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
        var pickedObject = this.$pickedObject;

        var camera, scene, raycaster, renderer, stats;
        var enableclick = 0;
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

            scene.add( new THREE.AmbientLight( 0xffffff, 1.0 ) );

            var light = new THREE.DirectionalLight( 0xffffff, 0,35 );
            light.position.set( 1, 1, 1 ).normalize();
            scene.add( light );

            //Import glb
            var loader = new GLTFLoader();

            // Hier voegen wij een model toe
            loader.load( 'src/assets/models/deur-merged.glb', function ( object ) {
                    var deur = object.scene;

                    deur.scale.x = 50;
                    deur.scale.y =70;
                    deur.scale.z = 50;

                    deur.position.x = 0;
                    deur.position.y = 0;
                    deur.position.z = 200;
                    
                    deur.rotation.y = -90;
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

            loader.load( 'src/assets/models/douche-merged.glb', function ( object ) {
                var douche = object.scene;

                douche.scale.x = 50;
                douche.scale.y = 50;
                douche.scale.z = 50;

                douche.position.x = 50;
                douche.position.y = 0;
                douche.position.z = 200;

                scene.add(douche);
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

            loader.load( 'src/assets/models/key-merged.glb', function ( object ) {
                var key = object.scene;

                key.scale.x = 50;
                key.scale.y = 50;
                key.scale.z = 50;

                key.position.x = 100;
                key.position.y = 0;
                key.position.z = 200;

                scene.add(key);
                objects.push(key);
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

            loader.load( 'src/assets/models/koelkast-merged.glb', function ( object ) {
                var koelkast = object.scene;

                koelkast.scale.x = 50;
                koelkast.scale.y = 50;
                koelkast.scale.z = 50;

                koelkast.position.x = -50;
                koelkast.position.y = 0;
                koelkast.position.z = 200;

                scene.add(koelkast);
                objects.push(koelkast);
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

            loader.load( 'src/assets/models/telefoon-merged.glb', function ( object ) {
            var telefoon = object.scene;

            telefoon.scale.x = 50;
            telefoon.scale.y = 50;
            telefoon.scale.z = 50;

            telefoon.position.x = 80;
            telefoon.position.y = 0;
            telefoon.position.z = 200;

            scene.add(telefoon);
            objects.push(telefoon);
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

            loader.load( 'src/assets/models/toilet-merged.glb', function ( object ) {
        var toilet = object.scene;

        toilet.scale.x = 50;
        toilet.scale.y = 50;
        toilet.scale.z = 50;

        toilet.position.x = 0;
        toilet.position.y = 50;
        toilet.position.z = 200;

        scene.add(toilet);
        objects.push(toilet);
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
            

            // three js example
            raycaster = new THREE.Raycaster();

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            canvas[0].appendChild( renderer.domElement );

            stats = new Stats();
            document.body.appendChild( stats.dom );

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            window.addEventListener( 'resize', onWindowResize, false );

            var onMouseClick;
            var onMouseClick = (event) => {
                // calculate mouse position in normalized device coordinates
                // (-1 to +1) for both components
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                // update the picking ray with the camera and mouse position
                raycaster.setFromCamera( mouse, camera );

                //intersects is de gevonden objecten
                var intersects = raycaster.intersectObjects(objects, true);
                //zet de intersects neer in rayobject
                var rayobject = intersects[0];
                
               //check of hij ooit al een formulier gegeven heeft
               if (!$(question).hasClass("begonnen")){
                    if (rayobject.object.name.includes("deur")) {
                        //voeg class toe van onderwerp
                        question.addClass('AskName')
                        //voeg class toe die aangeeft dat we begonnen zijn
                        question.addClass('begonnen');
                        //begin met vragen stellen
                        Questions();
                        //laat de vragen zien
                        question.show();
                    } else if (rayobject.object.name.includes("douche")) {
                        Questions();
                        question.addClass('douche');
                        question.addClass('begonnen');
                        question.show();
                    } else if (rayobject.object.name.includes("koelkast")) {
                        Questions();
                        question.addClass('koelkast');
                        question.addClass('begonnen');
                        question.show();
                    } else if (rayobject.object.name.includes("telefoon")) {
                        Questions();
                        question.addClass('telefoon');
                        question.addClass('begonnen');
                        question.show();
                    } else if (rayobject.object.name.includes("toilet")) {
                        Questions();
                        question.addClass('toilet');
                        question.addClass('begonnen');
                        question.show();
                    }
                }
        }
            window.addEventListener( 'mousedown', onMouseClick, true);
            //renderer.domElement.addEventListener('click', onMouseClick, false);

            var effectController = {

                focalLength: 55,
                // jsDepthCalculation: true,
                // shaderFocus: false,
                //
                fstop: 2.8,
                maxblur: 0,
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
            camera.lookAt( scene.position );
            camera.updateMatrixWorld();

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