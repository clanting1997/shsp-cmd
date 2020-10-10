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
        var camera = new THREE.PerspectiveCamera( 100, Width / Height, 0.1, 1000 );

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
            let guruWidth = guru.geometry.scale.x, // social
                guruHeight = guru.geometry.scale.y, // society
                guruRadius = guru.geometry.parameters.widthSegments, // health
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

            guru.geometry.scale.x = guruWidth + social;
            guru.geometry.scale.y = guruHeight + society;
            // guru.geometry.parameters.widthSegments = guru.geometry.parameters.heightSegments = guruRadius - health * 5;
            guru.rotation.set(environment, environment, environment);
            guru.geometry.parameters.radius = guruSize - finance;

            // guru.geometry.parameters.widthSegments = guru.geometry.parameters.heightSegments = 2;

            // console.log(guru.rotation.set(3, 3, 3));
            console.log(guru.rotation);
            console.log(guru.geometry.parameters);

        }


    }
};

export default(() => {
    $('.Guru').each(function() {
        new Guru($(this));
    })
})