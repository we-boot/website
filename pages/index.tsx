import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import gsap, { Expo, Power0 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavBar } from "../components/NavItem";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const phoneRef = useRef<THREE.Group>();
    const mouseAnimationRef = useRef<boolean>(true);

    function renderCanvas() {
        console.log("render canvas");
        let canvas = canvasRef.current!;

        let scene = new THREE.Scene();

        let windowHeight = window.innerHeight,
            windowWidth = window.innerWidth / 2;

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
            windowWidth = window.innerWidth / 2;
            windowHeight = window.innerHeight;

            // Update camera
            camera.aspect = windowWidth / windowHeight;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(windowWidth, windowHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        // let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        // scene.add(ambientLight);
        let pointLight = new THREE.PointLight(0xeeccff, 3);
        pointLight.position.x = -2;
        pointLight.position.y = 3;
        pointLight.position.z = 2;
        scene.add(pointLight);

        console.log("loading environment texture");
        let rgbeLoader = new RGBELoader();

        // Adjusted from example https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
        // Bloom pass https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom.html
        // Texture from https://polyhaven.com/a/studio_small_09
        rgbeLoader.setPath("/");
        rgbeLoader.load("studio_small_09_1k.hdr", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.generateMipmaps = true;
            scene.environment = texture;

            console.log("loading model");
            let gltfLoader = new GLTFLoader();
            gltfLoader.load("phone.gltf", (gltf) => {
                gltf.scene.translateX(0);
                gltf.scene.rotateY(Math.PI);
                gltf.scene.rotateX(-Math.PI / 12);

                scene.add(gltf.scene);
                phoneRef.current = gltf.scene;
            });
        });

        let composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        let bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.05, 20, 0.02);
        composer.addPass(bloom);

        let clock = new THREE.Clock();

        function renderLoop() {
            let elapsedTime = clock.getDelta();

            // if (phoneRef.current) {
            // phoneRef.current.rotateY(0.5 * elapsedTime);
            // phoneRef.current.rotateX(0.1 * elapsedTime);
            // }

            // renderer.render(scene, camera);
            composer.render();
            window.requestAnimationFrame(renderLoop);
        }

        function onMouseMove(ev: MouseEvent) {
            if (!phoneRef.current || !mouseAnimationRef.current) return;
            let xPercent = ev.clientX / window.innerWidth + 0.2;
            let yPercent = ev.clientY / window.innerHeight + 0.2;
            phoneRef.current.rotation.x = Math.PI / 4 + (yPercent * Math.PI) / 2 + Math.PI / 2;
            phoneRef.current.rotation.y = Math.PI / 4 - (xPercent * Math.PI) / 2;
            // phone.rotation.y -= ev.movementX * 0.001;
            // phone.rotation.x += ev.movementY * 0.001;
        }
        window.addEventListener("mousemove", onMouseMove);

        // let previousScroll = window.scrollY;
        // function onScroll(ev: Event) {
        //     if (!phone) return;
        //     phone.rotation.x += (window.scrollY - previousScroll) * 0.001;
        //     previousScroll = window.scrollY;
        // }
        // window.addEventListener("scroll", onScroll);

        renderLoop();
    }

    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas();
        }

        async function next() {
            // Animate phone
            mouseAnimationRef.current = false;
            gsap.to(phoneRef.current!.position, { x: -0.5, duration: 1, ease: Expo.easeIn });
            gsap.to(phoneRef.current!.rotation, { y: -Math.PI * 2, duration: 1, ease: Expo.easeIn }).then(() => {
                gsap.fromTo(phoneRef.current!.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: Power0.easeNone });
                gsap.fromTo(phoneRef.current!.position, { x: 0.5 }, { x: 0, duration: 1, ease: Expo.easeOut });
                gsap.to(phoneRef.current!.rotation, { y: 0, duration: 2, ease: Expo.easeOut }).then(() => {
                    mouseAnimationRef.current = true;
                });
            });

            // Animate text
            gsap.to(textRef.current, { opacity: 0, duration: 1, x: -100, ease: Expo.easeIn }).then(() =>
                gsap.fromTo(textRef.current, { opacity: 0, duration: 1, x: 100 }, { opacity: 1, duration: 1, x: 0, ease: Expo.easeOut })
            );
        }

        let id = setInterval(next, 5000);
        return () => {
            clearInterval(id);
        };

        // gsap.from(canvasRef.current, { scale: 0, duration: 0.5, x: 500, opacity: 0 });
    }, []);

    return (
        <div>
            <div
                className="h-screen w-full flex flex-col relative text-white max-w-full overflow-x-hidden"
                style={{
                    background: "url(/gradient.png)",
                    backgroundSize: "100vw 101vh",
                }}>
                <NavBar />
                <div className="overflow-x-hidden absolute top-0 left-0 w-full h-full flex flex-row items-center pointer-events-none">
                    <canvas className="origin-center" ref={canvasRef} />
                    <div className="m-20 text-4xl font-bold text-right">
                        <p>We build professional grade</p>
                        <p ref={textRef}>automatisation software.</p>
                    </div>
                </div>
                <div className="mt-auto flex justify-center">
                    <div
                        className="p-10 flex items-center flex-col opacity-50"
                        onClick={() => window.scrollTo({ behavior: "smooth", top: window.innerHeight, left: 0 })}>
                        <p className="">Scroll down for more info</p>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
            </div>
            <div className="h-screen w-full text-white" style={{ background: "#111" }}>
                <div className="p-10 text-4xl font-bold text-center">How we work</div>
            </div>
        </div>
    );
}
