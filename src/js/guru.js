import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Guru {
    constructor($Guru) {
        this.$Guru = $Guru;
        this.listener();
    }

    listener() {
        var Height = window.innerHeight/5;
        var Width = window.innerWidth/5;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, Width / Height, 0.1, 1000 );

        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var guru = new THREE.Mesh( geometry, material );
        scene.add( guru );
        guru.scale.set(2,2,2);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( Width, Height );
        document.body.appendChild( renderer.domElement );
        renderer.setClearColor (0xFFF0fF, 1);

        var controls = new OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, 20, 5 );
        controls.update();

       animate();
        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }
    }
};

export default(() => {
    $('.Guru').each(function() {
        new Guru($(this));
    })
})