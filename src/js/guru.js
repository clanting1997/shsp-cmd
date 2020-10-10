import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Questions from "./Questions";

class Guru {
    constructor($Guru) {
        this.$Guru = $Guru;
        this.listener();
    }

    listener() {
        const guruCanvas = this.$Guru;
        var Height = window.innerHeight/5;
        var Width = window.innerWidth/5;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, Width / Height, 0.1, 1000 );

        var geometry = new THREE.SphereGeometry( 5, 32, 32 );

        var material = new THREE.MeshBasicMaterial( {color: 0x071013} );
        var guru = new THREE.Mesh( geometry, material );
        scene.add( guru );
        guru.scale.set(2,2,2);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( Width, Height );
        guruCanvas[0].appendChild( renderer.domElement );
        renderer.setClearColor (0xffffff, 1);

        var controls = new OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, 20, 5 );
        controls.update();

       animate();
        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }


        $.updateGuru = function () {
            let guruWidth = guru.geometry.parameters.widthSegments, // social
                guruHeight = guru.geometry.parameters.heightSegments, // society
                // guruRadius = guru.geometry.parameters.radius; // health
                guruSize = guru.geometry.parameters.radius; // finance
            const answerDoorOne = $("input[name='door-1']:checked"),
                environment = answerDoorOne.data("environment"),
                health = answerDoorOne.data("health"),
                finance = answerDoorOne.data("finance"),
                society = answerDoorOne.data("society"),
                social = answerDoorOne.data("social");

            console.log('environment: ' + environment);
            console.log('health: ' + health);
            console.log('finance: ' + finance);
            console.log('society: ' + society);
            console.log('social: ' + social);

            console.log('updating...');

            guruWidth = guruWidth - social;
            guruHeight = guruHeight - society;
            // guruRadius = guruRadius + health;
            // guruSize = guruSize - finance;

            // guruSize = 7;

            guru.geometry.parameters.radius = 7;


            console.log(guru.geometry.parameters);

        }


    }
};

export default(() => {
    $('.Guru').each(function() {
        new Guru($(this));
    })
})