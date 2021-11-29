import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function renderCanvas() {
        console.log("render canvas");
        let canvas = canvasRef.current!;

        const scene = new THREE.Scene();

        let windowHeight = window.innerHeight,
            windowWidth = window.innerWidth;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
        });
        renderer.setSize(windowWidth, windowHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 100);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0.5;
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

        const clock = new THREE.Clock();

        function renderLoop() {
            const elapsedTime = clock.getElapsedTime();

            // Update objects
            // sphere.rotation.y = 0.5 * elapsedTime;

            renderer.render(scene, camera);
            window.requestAnimationFrame(renderLoop);
        }

        renderLoop();

        const pointLight = new THREE.AmbientLight(0xffffff, 1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        scene.add(pointLight);

        const rgbeLoader = new RGBELoader();
        console.log("loading environment texture");

        rgbeLoader.setPath("/");
        rgbeLoader.load("studio_small_09_4k.hdr", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            // scene.background = texture;
            scene.environment = texture;

            console.log("loaded texture");
            // Objects
            const gltfLoader = new GLTFLoader();

            gltfLoader.load("phone.gltf", (gltf) => {
                scene.add(gltf.scene);
                // gltf.scene.scale.set(1.2, 1.2, 1.2);
            });
        });
        // rgbeLoader.load()
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
                <div className="flex flex-grow items-center">
                    <div className="flex-grow overflow-x-hidden">
                        <canvas ref={canvasRef} />
                    </div>
                    {/* <div className="flex-grow">text here</div> */}
                </div>
            </div>
            {/* <div>next page here</div> */}
        </div>
    );
}
