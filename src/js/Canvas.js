import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
// import { TweenMax, TimelineMax } from "gsap/all";
import {AmbientLight} from "three";
import Questions from "././Questions";

// models
import ModelDoor from '../models/deur-merged.glb';
import ModelDouche from '../models/douche-merged.glb';
import ModelKey from '../models/key-merged.glb';
import ModelFridge from '../models/koelkast-merged.glb';
import ModelPhone from '../models/telefoon-merged.glb';
import ModelToilet from '../models/toilet-merged.glb';


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
    var mouseX, mouseY;
    var camera, scene, raycaster, renderer, stats, particles;
    var enableclick = 0;
    var mouse = new THREE.Vector2(), INTERSECTED;
    var radius = 100, theta = 0;
    var objects = [];
    init();
    animate();

    function init() {
        const _this = $(this);

        var array_buffer = null;

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 2, 1000 );
        camera.position.set(0, 0, 10) ;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xf0f0f0 );

        //

        scene.add( new THREE.AmbientLight( 0xffffff, 1.0 ) );
        var light = new THREE.DirectionalLight( 0xffffff, 0.35 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        //

        //Import glb
        var loader = new GLTFLoader();

        // Hier voegen wij een model toe
        // loader.load( '../models/deur-merged.glb', function ( object ) {
            loader.load( ModelDoor, function ( object ) {

                    var deur = object.scene;

                deur.scale.x = 50;
                deur.scale.y =70;
                deur.scale.z = 50;

                deur.position.x = 0;
                deur.position.y = 0;
                deur.position.z = -100;

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

        loader.load( ModelDouche, function ( object ) {
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

        loader.load( ModelKey, function ( object ) {
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

        loader.load( ModelFridge, function ( object ) {
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

        loader.load( ModelPhone, function ( object ) {
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

        loader.load( ModelToilet, function ( object ) {
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


        //Maak een nieuwe raycaster
        raycaster = new THREE.Raycaster();
        renderer = new THREE.WebGLRenderer( { antialias: true } );

        //Maak de klikregio net zo groot als het scherm
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        canvas[0].appendChild( renderer.domElement );

        stats = new Stats();
        // document.body.appendChild( stats.dom );

        document.body.addEventListener( 'pointermove', onPointerMove, false );
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
            console.log(rayobject.object.name);

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

                    camera.position.set(0, 0, 300);
                    console.log(rayobject);
                } else if (rayobject.object.name.includes("douche")) {
                    question.addClass('douche');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                } else if (rayobject.object.name.includes("koelkast")) {
                    question.addClass('koelkast');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                } else if (rayobject.object.name.includes("telefoon")) {
                    question.addClass('telefoon');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                } else if (rayobject.object.name.includes("toilet")) {
                    question.addClass('toilet');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                }

                console.log(objects.length);

                if (objects.length = 0) {
                    $.finishScreen();
                }
            }
    }


        window.addEventListener( 'mousedown', onMouseClick, true);

        window.addEventListener( 'resize', onWindowResize, false );

        //

        //Particles
        var vertices = [];
        var material;
        var geometry = new THREE.BufferGeometry();

        for ( var i = 0; i < 10000; i ++ ) {

            var x = 2000 * Math.random() - 1000;
            var y = 2000 * Math.random() - 1000;
            var z = 2000 * Math.random() - 1000;

            vertices.push( x, y, z );
        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        material = new THREE.PointsMaterial( { size: 5, sizeAttenuation: true, alphaTest: 1, transparent: true } );
        material.color = new THREE.Color("rgb(252, 202, 70)");
        particles = new THREE.Points( geometry, material );
        scene.add( particles );
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


        function onPointerMove( event ) {

            if ( event.isPrimary === false ) return;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        }

    function animate() {
        requestAnimationFrame( animate, renderer.domElement );
        render();
    }


    function render() {
        //particles laten bewegen
        particles.position.z -= .05;
        particles.position.x += ( - mouse.x - particles.position.x );
        particles.position.y += ( - mouse.y - particles.position.y );

        //objecten laten bewegen

        camera.lookAt( scene.position );
        camera.updateMatrixWorld();
        renderer.render( scene, camera );
    }
}
}

export default(() => {
$('.canvas').each(function() {
    new Canvas($(this));
});

})