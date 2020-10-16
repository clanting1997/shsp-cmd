import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Guru {
    constructor($Guru) {
        this.$Guru = $Guru;
        this.listener();
    }

    listener() {
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

        var renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( Width, Height );
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
            let answer = guruCanvas;

            // migrate old + new data

            let environment = parseInt(answer.attr('data-environment')) + answerData.environment,
                health = parseInt(answer.attr("data-health")) + answerData.health,
                finance = parseInt(answer.attr("data-finance")) + answerData.finance,
                society = parseInt(answer.attr("data-society")) + answerData.society,
                social = parseInt(answer.attr("data-social")) + answerData.social;


            _this.updateGuru(answer, environment,  health, finance, society, social, guru,  controls, renderer, scene, camera);

            // update array

            answerData = {
                'environment': environment,
                'health': health,
                'finance': finance,
                'society': society,
                'social': social
            }

            console.log(answerData);
        }

        $.lastGuru = function () {
            var DataJSON = JSON.stringify(answerData);
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


    updateGuru(answer, environment,  health, finance, society, social, guru,  controls, renderer, scene, camera)  {
        let guruRotation = environment * 0.01, // environment
            guruOpacity = guru.material.opacity, // health
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

        guru.material.opacity  = guruOpacity - health * 0.1;


        // finance + society + social

        guruHeight = guruHeight - society * 0.1;
        guruWidth = guruWidth - social * 0.1;
        guru.scale.set(guruWidth + finance, guruHeight + finance, guru.scale.z + finance);

        renderer.render(scene, camera);
    }
};

export default(() => {
    $('.Guru').each(function() {
        new Guru($(this));
    })
})