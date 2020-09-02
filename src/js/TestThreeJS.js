

class TestThreeJS {
    constructor($TestThreeJS) {
        this.$testThreeJS = $TestThreeJS;

        this.listener();
    }

    listener() {
        console.log('the three js works !!');

        var scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera(
                75, // field of view
                window.innerWidth/window.innerHeight,  // aspect ratio
                0.1,
                1000
            ),
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });

        camera.position.z = 5;

        renderer.setClearColor("#e5e5e5"); // background
        renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix(); // update camera
        });

        var raycaster = new THREE.Raycaster(),
            mouse = new THREE.Vector2();


        // // var geometry = new THREE.SphereGeometry(1, 4, 4), // radius, widthSegments, heightSegments
        // var geometry = new THREE.BoxGeometry(1, 1, 1), // x, y, z
        //     material = new THREE.MeshLambertMaterial({
        //         color: 0xFFCC00 // a material for non-shinysurfaces, without spectacular highlights
        //     }),
        //     mesh =  new THREE.Mesh(geometry,material);
        //
        // // mesh.position.set(2, 2, -2);  // x,y,z
        // // mesh.rotation.set(45, 0, 0);
        // // mesh.scale.set(1, 2,  1); // x, y, z
        //
        // scene.add(mesh);
        //
        // var geometry = new THREE.BoxGeometry(1, 1, 1), // x, y, z
        //     material = new THREE.MeshLambertMaterial({color: 0xFFCC00 }),
        //     mesh =  new THREE.Mesh(geometry,material);
        //
        // mesh.position.y = 2;
        // scene.add(mesh);

        var geometry = new THREE.BoxGeometry(1, 1, 1), // x, y, z
            material = new THREE.MeshLambertMaterial({color: 0xF7F7F7 });

        meshX = -10;
        for(var i=0; i<15; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;
            scene.add(mesh);
            meshX += 1;
        }

        var light = new THREE.PointLight(0xFFFFFF,1, 1000);// color, intensity, distance - a light that gets emitted from a single point in all directions
        light.position.set(0, 0, 0);
        scene.add(light);

        var light = new THREE.PointLight(0xFFFFFF,2, 1000);// color, intensity, distance - a light that gets emitted from a single point in all directions
        light.position.set(0, 0, 25);
        scene.add(light);

        var render = function() {
            requestAnimationFrame(render);

            // mesh.rotation.x +=  0.05;
            // mesh.rotation.y += 0.01;
            //
            // mesh.scale.x += -0.01;  // animate the changes

            renderer.render(scene,camera);
        }; // 60 fps

        function onMouseMove(event) {
            event.preventDefault();

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true)

            for(var i = 0; i < intersects.length; i++) {
                this.tl = new TimelineMax();
                this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut });
                this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut });
                this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
            }
        }

        render();

        // this.tl = new TimelineMax().delay(3); // with the tweenmax.js
        // this.tl = new TimelineMax({
        //     paused: true
        // });
        // this.tl.to(this.mesh.scale, 1, {
        //     x:  2,
        //     ease: Expo.easeOut
        // });
        // this.tl.to(this.mesh.scale, .5, {x: .5, ease: Expo.easeOut });
        // this.tl.to(this.mesh.position, .5, {x:  2, ease: Expo.easeOut });
        // this.tl.to(this.mesh.rotation, .5, {y:  Math.PI*.5, ease: Expo.easeOut}, "=-1.5");

        // document.body.addEventListener('click', () => {
        //     this.tl.play();
        // })

        window.addEventListener('mousemove', onMouseMove);
    }
}

export default(() => {
    $('body').each(function() {
        new TestThreeJS($(this));
    })
})