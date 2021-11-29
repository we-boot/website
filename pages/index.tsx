import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function renderCanvas() {
        console.log("render canvas");
        let canvas = canvasRef.current!;

        let scene = new THREE.Scene();

        let windowHeight = window.innerHeight,
            windowWidth = window.innerWidth;

        let renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(windowWidth, windowHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        let camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 100);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0.4;
        scene.add(camera);

        window.addEventListener("resize", () => {
            // Update sizes
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;

            // Update camera
            camera.aspect = windowWidth / windowHeight;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(windowWidth, windowHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        let ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        let pointLight = new THREE.PointLight(0x300078, 2);
        pointLight.position.x = 1;
        pointLight.position.y = 3;
        pointLight.position.z = 2;
        scene.add(pointLight);

        console.log("loading environment texture");
        let rgbeLoader = new RGBELoader();
        let phone: THREE.Group;

        // Adjusted from example https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
        // Bloom pass https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom.html
        // Texture from https://polyhaven.com/a/studio_small_09
        rgbeLoader.setPath("/");
        rgbeLoader.load("studio_small_09_4k.hdr", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;

            console.log("loading model");
            let gltfLoader = new GLTFLoader();
            gltfLoader.load("phone.gltf", (gltf) => {
                gltf.scene.translateX(-0.2);
                gltf.scene.rotateY(Math.PI);
                gltf.scene.rotateX(-Math.PI / 12);

                scene.add(gltf.scene);
                phone = gltf.scene;
            });
        });

        let composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        let bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.05, 20, 0.5);
        composer.addPass(bloom);

        let clock = new THREE.Clock();

        function renderLoop() {
            let elapsedTime = clock.getDelta();

            if (phone) {
                phone.rotateY(0.5 * elapsedTime);
                phone.rotateX(0.1 * elapsedTime);
            }

            // renderer.render(scene, camera);
            composer.render();
            window.requestAnimationFrame(renderLoop);
        }

        renderLoop();
    }

    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas();
        }
    }, []);

    return (
        <div>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: "url(/gradient.png)",
                    backgroundSize: "100vw 101vh",
                    color: "white",
                }}>
                <nav className="p-6">
                    <h1 className="font-bold text-2xl leading-3">weboot</h1>
                    <p className="opacity-50 text-lg">we solve digital challenges</p>
                </nav>
                <div className="overflow-x-hidden" style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none" }}>
                    <canvas ref={canvasRef} />
                </div>
            </div>
            {/* <div>next page here</div> */}
        </div>
    );
}
