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
    var mouseX, mouseY, objects;
    var camera, scene, raycaster, newraycaster, renderer, stats, particles;
    var enableclick, counter = 0;
    var objects = [];
    var mouse = new THREE.Vector2(), INTERSECTED;
    var radius = 100, theta = 0;
    init();
    animate();

    function init() {
        const _this = $(this);
        question.addClass('AskName')
        var array_buffer = null;

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 2, 1000 );
        camera.position.set(0, 0, 0) ;

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
               // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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
            douche.position.set(40,-30,280);

            scene.add(douche);
            objects.push(douche);
        },
        // called while loading is progressing
        function ( xhr ) {
            //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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

            koelkast.position.set(-50,30,300);


            scene.add(koelkast);
            objects.push(koelkast);
        },
        // called while loading is progressing
        function ( xhr ) {
            //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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

        telefoon.position.set(50,30,300);

        scene.add(telefoon);
        objects.push(telefoon);
    },
    // called while loading is progressing
    function ( xhr ) {
        //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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

    toilet.position.set(-40,-40,300);


    scene.add(toilet);
    objects.push(toilet);
},
// called while loading is progressing
function ( xhr ) {
    //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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
            var intersects = raycaster.intersectObjects(scene.children, true);

            //zet de intersects neer in rayobject
            var rayobject = intersects[0];
           //check of hij ooit al een formulier gegeven heeft
           if (!$(question).hasClass("begonnen")){
                if (rayobject.object.name.includes("deur")) {
                    //voeg class toe die aangeeft dat we begonnen zijn
                    question.addClass('begonnen');
                    canvas.addClass('rotate');
                    //begin met vragen stellen
                    Questions();
                    //laat de vragen zien
                    question.show();
                    //beweeg camera
                    camera.position.z = 500;
                    //haal object
                    intersects[0].object.parent.position.z = 10000;
                    scene.remove(intersects[0]);
                    counter += 1;
                } else if (rayobject.object.name.includes("douche")) {
                    question.addClass('douche');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                    intersects[0].object.parent.position.z = 10000;
                    scene.remove(intersects[0]);
                    counter += 1;
                } else if (rayobject.object.name.includes("koelkast")) {
                    question.addClass('koelkast');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                    intersects[0].object.parent.position.z = 10000;
                    scene.remove(intersects[0]);
                    counter += 1;
                } else if (rayobject.object.name.includes("telefoon")) {
                    question.addClass('telefoon');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                    intersects[0].object.parent.position.z = 10000;
                    scene.remove(intersects[0]);
                    counter += 1;
                } else if (rayobject.object.name.includes("toilet")) {
                    question.addClass('toilet');
                    question.addClass('begonnen');
                    question.addClass('passedStart');
                    Questions();
                    question.show();
                    intersects[0].object.parent.position.z = 10000;
                    scene.remove(intersects[0]);
                    counter += 1;
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

    function checkDone(){
        if (counter == 5 ) {
            if (!$(question).hasClass("begonnen")){
            $.finishScreen();
            counter += 1;

            SoundData.forEach((item, i) => {
                setTimeout(function () {
                    var AudioElement = document.createElement('audio');
                    AudioElement.setAttribute('src', item);
                    AudioElement.play();
                    }, i * 200);
                })
    }}
    }
    function animate() {
        //camera.position.set(0, 0, 400);
        requestAnimationFrame( animate, renderer.domElement );
        render();
        checkDone();
    }


    function render() {
        //particles laten bewegen
        particles.position.z -= .05;
        particles.position.x += ( - mouse.x - particles.position.x );
        particles.position.y += ( - mouse.y - particles.position.y );

        if (canvas.hasClass('rotate')){
            var Rotatespeed = 0.01;
            $.each(objects, function(index,value) {
                objects[index].rotation.y += Rotatespeed;
            })
        }
        //objecten laten bewegen
        camera.lookAt( scene.position );
        raycaster.setFromCamera( mouse, camera );
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