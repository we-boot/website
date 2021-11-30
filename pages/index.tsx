import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader, GLTFParser } from "three/examples/jsm/loaders/GLTFLoader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import gsap, { Expo, Power0 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { NavBar } from "../components/NavItem";
import { Mapping, TextureLoader } from "three";
import { StepsGrid } from "../components/StepsGrid";

type SpotlightItem = {
    imageUrl: string;
    text: string;
    type: "phone" | "computer";
    texture?: THREE.Texture;
};

const SPOTLIGHT: SpotlightItem[] = [
    {
        type: "phone",
        imageUrl: "/groen.png",
        text: "automatisation software",
    },
    {
        type: "phone",
        imageUrl: "/inspections.png",
        text: "productivity tools",
    },
    {
        type: "computer",
        imageUrl: "/desktop.png",
        text: "data driven dashboards",
    },
];

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const phoneRef = useRef<THREE.Group>();
    const mouseAnimationRef = useRef<boolean>(true);
    const phoneScreenRef = useRef<THREE.MeshStandardMaterial>();
    const monitorRef = useRef<THREE.Group>();
    const monitorScreenRef = useRef<THREE.MeshStandardMaterial>();
    const spotlightIndexRef = useRef<number>(2);

    async function showSpotlightItem(spotlight: SpotlightItem) {
        // Update phone texture
        if (!spotlight.texture) {
            let textureLoader = new TextureLoader();
            spotlight.texture = await textureLoader.loadAsync(spotlight.imageUrl);
            // spotlight.texture.minFilter = THREE.NearestFilter;
            spotlight.texture.flipY = false;
        }

        if (spotlight.type === "phone") {
            phoneScreenRef.current!.emissiveMap = spotlight.texture!;
            phoneScreenRef.current!.emissiveMap.needsUpdate = true;
            phoneScreenRef.current!.needsUpdate = true;

            // Animate model
            gsap.fromTo(phoneRef.current!.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: Power0.easeNone });
            gsap.fromTo(phoneRef.current!.position, { x: 0.5 }, { x: 0, duration: 1, ease: Expo.easeOut });
            gsap.to(phoneRef.current!.rotation, { y: 0, duration: 2, ease: Expo.easeOut }).then(() => {
                mouseAnimationRef.current = true;
            });
        } else if (spotlight.type === "computer") {
            monitorScreenRef.current!.emissiveMap = spotlight.texture!;
            monitorScreenRef.current!.emissiveMap.needsUpdate = true;
            monitorScreenRef.current!.needsUpdate = true;

            // Animate model
            gsap.fromTo(monitorRef.current!.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: Power0.easeNone });
            gsap.fromTo(monitorRef.current!.position, { x: 0.5 }, { x: 0, duration: 1, ease: Expo.easeOut });
            gsap.to(monitorRef.current!.rotation, { y: -Math.PI / 2, duration: 2, ease: Expo.easeOut }).then(() => {
                mouseAnimationRef.current = true;
            });
        }

        // Animate text
        textRef.current!.innerText = spotlight.text;
        gsap.fromTo(textRef.current, { opacity: 0, duration: 1, x: 100 }, { opacity: 1, duration: 1, x: 0, ease: Expo.easeOut });
    }

    async function nextSpotlightItem() {
        mouseAnimationRef.current = false;

        let currentSpotlight = SPOTLIGHT[spotlightIndexRef.current];

        // Animate text
        gsap.to(textRef.current, { opacity: 0, duration: 1, x: -100, ease: Expo.easeIn });

        // Animate phone
        if (currentSpotlight.type === "phone") {
            gsap.to(phoneRef.current!.position, { x: -0.5, duration: 1, ease: Expo.easeIn });
            await gsap.to(phoneRef.current!.rotation, { y: -Math.PI * 2, duration: 1, ease: Expo.easeIn }).then();
        } else if (currentSpotlight.type === "computer") {
            gsap.to(monitorRef.current!.position, { x: -2, duration: 1, ease: Expo.easeIn });
            await gsap.to(monitorRef.current!.rotation, { y: Math.PI, duration: 1, ease: Expo.easeIn }).then();
        }

        if (++spotlightIndexRef.current >= SPOTLIGHT.length) {
            spotlightIndexRef.current = 0;
        }
        showSpotlightItem(SPOTLIGHT[spotlightIndexRef.current]);
    }

    function renderCanvas() {
        let canvas = canvasRef.current!;

        let canvasRect = canvas.getBoundingClientRect();
        console.log("canvas size", canvasRect.width, canvasRect.height);

        let scene = new THREE.Scene();

        let renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(canvasRect.width, canvasRect.height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        let camera = new THREE.PerspectiveCamera(75, canvasRect.width / canvasRect.height, 0.1, 100);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0.5;
        scene.add(camera);

        window.addEventListener("resize", () => {
            let canvas = canvasRef.current!;
            let newCanvasRect = canvas.getBoundingClientRect();
            console.log("new canvas size", newCanvasRect.width, newCanvasRect.height);

            // Update camera
            camera.aspect = newCanvasRect.width / newCanvasRect.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(newCanvasRect.width, newCanvasRect.height, false);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        // let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        // scene.add(ambientLight);
        // let pointLight = new THREE.PointLight(0xeeccff, 3);
        // pointLight.position.x = -2;
        // pointLight.position.y = 3;
        // pointLight.position.z = 2;
        // scene.add(pointLight);

        console.log("loading environment texture");
        let rgbeLoader = new RGBELoader();

        // Adjusted from example https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
        // Bloom pass https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom.html
        // Texture from https://polyhaven.com/a/studio_small_09
        rgbeLoader.setPath("/");
        rgbeLoader.load("photo_studio_01_1k.hdr", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            // texture.generateMipmaps = true;
            scene.environment = texture;

            console.log("loading models");
            let gltfLoader = new GLTFLoader();

            gltfLoader.load("phone.gltf", (gltf) => {
                gltf.scene.translateX(-0.5);
                gltf.scene.rotateY(Math.PI);
                gltf.scene.rotateX(-Math.PI / 12);

                // Find screen material
                gltf.scene.traverse((child: any) => {
                    if (child.isMesh) {
                        let mesh = child as THREE.Mesh;
                        let material = mesh.material as THREE.MeshStandardMaterial;
                        if ((mesh.material as any).name === "Screen") {
                            material.envMapIntensity = 0.04;
                            material.roughness = 0;
                            phoneScreenRef.current = material;
                        }
                    }
                });

                scene.add(gltf.scene);
                phoneRef.current = gltf.scene;
                console.log("done loading phone model");
                showSpotlightItem(SPOTLIGHT[2]);
            });

            gltfLoader.load("monitor.gltf", (gltf) => {
                gltf.scene.translateX(-0.5);

                // Find screen material
                gltf.scene.traverse((child: any) => {
                    if (child.isMesh) {
                        let mesh = child as THREE.Mesh;
                        let material = mesh.material as THREE.MeshStandardMaterial;
                        if ((mesh.material as any).name === "Screen") {
                            material.envMapIntensity = 0.04;
                            material.roughness = 0;
                            monitorScreenRef.current = material;
                        }
                    }
                });

                scene.add(gltf.scene);
                monitorRef.current = gltf.scene;
                console.log("done loading monitor model");
            });
        });

        let composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        // let bloom = new UnrealBloomPass(new THREE.Vector2(canvasRect.width, canvasRect.height), 0.05, 20, 0.02);
        // composer.addPass(bloom);

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
            if (!mouseAnimationRef.current) return;
            let spotlight = SPOTLIGHT[spotlightIndexRef.current];
            if (spotlight.type === "phone" && phoneRef.current) {
                let xPercent = ev.clientX / window.innerWidth + 0.2;
                let yPercent = ev.clientY / window.innerHeight + 0.2;
                phoneRef.current.rotation.x = Math.PI / 4 + (yPercent * Math.PI) / 2 + Math.PI / 2;
                phoneRef.current.rotation.y = Math.PI / 4 - (xPercent * Math.PI) / 2;
            } else if (spotlight.type === "computer" && monitorRef.current) {
                let xPercent = ev.clientX / window.innerWidth + 0.2;
                monitorRef.current.rotation.y = Math.PI * 1.5 + (xPercent * Math.PI) / 4;
            }
        }
        window.addEventListener("mousemove", onMouseMove);

        renderLoop();
    }

    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas();
        }

        let id = setInterval(nextSpotlightItem, 5000);
        return () => {
            clearInterval(id);
        };
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
                <div className="overflow-x-hidden absolute top-0 left-0 w-screen h-screen flex flex-col lg:flex-row pointer-events-none">
                    <canvas className="origin-center h-2/3 lg:h-full w-full lg:w-1/2 flex-shrink" ref={canvasRef} />
                    <div className="flex justify-center lg:items-center h-1/3 lg:h-full w-full lg:w-1/2 flex-shrink">
                        <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-center lg:text-right ">
                            <p>We build professional grade</p>
                            <p ref={textRef}></p>
                        </div>
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
            <div
                className="h-screen w-full text-white"
                style={{
                    // background: "url(/gradient2.png)",
                    background: "#111",
                    backgroundSize: "100vw 101vh",
                }}>
                <div className="flex items-center flex-col p-10">
                    <p className=" text-4xl font-bold">How we work</p>
                    <p className="text-2xl opacity-50 mt-4">Your solution in 4 steps</p>
                </div>

                <div className="flex justify-center">
                    <StepsGrid />
                </div>

                {/* <div className="p-10 rounded-3xl m-10 inline-flex" style={{ background: "#ffffff11" }}>
                    <img src="/Saly-26.png" style={{ height: "150px" }} />
                    <div className="ml-10">
                        <h2 className="opacity-50">Step 1: pitch</h2>
                        <div className="font-bold text-2xl">
                            <p className="">Tell us your problem or idea</p>
                            <p className="">we’ll let you know what’s possible</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
