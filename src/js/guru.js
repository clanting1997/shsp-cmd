import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {sRGBEncoding} from "three";
import Sound from "././Sound";

class Guru {
    constructor($Guru) {
        this.$Guru = $Guru;
        this.listener();
    }

    listener() {
        console.log(SoundData)
        const _this = this,
        guruCanvas = this.$Guru;
        var Height = window.innerHeight/5;
        var Width = window.innerWidth/5;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 100, Width / Height, 0.1, 1000 );

        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        geometry.elementsNeedUpdate = true;

        var material = new THREE.MeshBasicMaterial( {color: 0x071013} );
        var guru = new THREE.Mesh( geometry, material );
        scene.add( guru );
        guru.scale.set(2,2,2);
        guru.material.transparent = true;
        material.opacity = 0.1;


        var renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( Width, Height );
        renderer.shadowMap.enabled = true;
        guruCanvas[0].appendChild( renderer.domElement );
        //renderer.setClearColor (0xffffff, 1);

        var controls = new OrbitControls( camera, renderer.domElement );
        camera.position.set( 0, 20, 5 );
        controls.update();

        animate();
        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }

        var answerData;

        $.firstGuru = function () {
            let answer = guruCanvas,
                environment = answer.data("environment"),
                health = answer.data("health"),
                finance = answer.data("finance"),
                society = answer.data("society"),
                social = answer.data("social");


            _this.updateGuru(answer, environment,  health, finance, society, social, guru,  controls, renderer, scene, camera);

            // create data array
            answerData = {
                'environment': environment,
                'health': health,
                'finance': finance,
                'society': society,
                'social':social
            }
            console.log(answerData);
        }

        $.updateData = function () {
            let answer = guruCanvas,
                red = answer.data("red"),
                blue = answer.data("blue");

            // migrate old + new data

            let environment = parseInt(answer.attr('data-environment')) + answerData.environment,
                health = parseInt(answer.attr("data-health")) + answerData.health,
                finance = parseInt(answer.attr("data-finance")) + answerData.finance,
                society = parseInt(answer.attr("data-society")) + answerData.society,
                social = parseInt(answer.attr("data-social")) + answerData.social;


            _this.updateGuru(answer, environment,  health, finance, society, social, guru,  controls, renderer, scene, camera, red,  blue);

            // update array

            answerData = {
                'environment': environment,
                'health': health,
                'finance': finance,
                'society': society,
                'height': guru.scale.y,
                'social': social,
                'width': guru.scale.x,
                'blue': blue,
                'red': red,
                'sound': SoundData
            }

            console.log(answerData);
        }

        $.lastGuru = function () {
            var DataJSON = JSON.stringify(answerData);
            var SoundJSON = JSON.stringify(SoundData);
            $.ajax({
                type: "POST",
                url: "data.php",
                data: {answerData: DataJSON},
                succes: function() {
                    console.log('data verstuurd');
                }
            });
        }
    }


    updateGuru(answer, environment, health, finance, society, social, guru,  controls, renderer, scene, camera, red, blue)  {
        let guruRotation = environment * 0.001, // environment
            green = parseInt(((finance * 255) / 6).toFixed(0)), // finance
            guruHeight = guru.scale.y, // society
            guruWidth = guru.scale.x; // social

        controls.update();

        // environment

        guruRotate();
        function guruRotate() {
            requestAnimationFrame(guruRotate);
            guru.rotation.x += guruRotation;
            guru.rotation.y += guruRotation;
            controls.update();
            renderer.render( scene, camera );
        }


        // health

        guru.material.opacity  = health / 12;


        // finance + geolocation

        if (red != undefined) {
            let color = new THREE.Color("rgb(" + red + "," + green + "," + blue + ")");
            guru.material.color = color;
        }


        // society + social

        guruHeight = guruHeight - society * 0.1;
        guruWidth = guruWidth - social * 0.1;
        guru.scale.set(guruWidth, guruHeight, guru.scale.z);

        renderer.render(scene, camera);
    }
};

export default(() => {
    $('.Guru').each(function() {
        new Guru($(this));
    })
})