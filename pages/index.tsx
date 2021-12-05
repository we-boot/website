import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader, GLTFParser } from "three/examples/jsm/loaders/GLTFLoader";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import gsap, { Expo, Power0 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEnvelope, faMousePointer, faPaperPlane, faStore, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { NavBar } from "../components/NavItem";
import { Mapping, TextureLoader } from "three";
import { StepsGrid } from "../components/StepsGrid";
import { QualityGrid } from "../components/QualityGrid";
import { Footer } from "../components/Footer";
import { TechologyStrip } from "../components/TechnologyIcons";

type SpotlightItem = {
    imageUrl: string;
    text: string;
    type: "phone" | "computer";
    texture?: THREE.Texture;
};

const MONITOR_SCALE = 0.95;
const PHONE_SCALE = 1.2;
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
            gsap.fromTo(
                phoneRef.current!.scale,
                { x: 0, y: 0, z: 0 },
                { x: PHONE_SCALE, y: PHONE_SCALE, z: PHONE_SCALE, duration: 0.5, ease: Power0.easeNone }
            );
            gsap.fromTo(phoneRef.current!.position, { x: 0.5 }, { x: 0, duration: 1, ease: Expo.easeOut });
            gsap.to(phoneRef.current!.rotation, { y: 0, duration: 2, ease: Expo.easeOut }).then(() => {
                mouseAnimationRef.current = true;
            });
            phoneRef.current!.visible = true;
        } else if (spotlight.type === "computer") {
            monitorScreenRef.current!.emissiveMap = spotlight.texture!;
            monitorScreenRef.current!.emissiveMap.needsUpdate = true;
            monitorScreenRef.current!.needsUpdate = true;

            // Animate model
            gsap.fromTo(
                monitorRef.current!.scale,
                { x: 0, y: 0, z: 0 },
                { x: MONITOR_SCALE, y: MONITOR_SCALE, z: MONITOR_SCALE, duration: 0.5, ease: Power0.easeNone }
            );
            gsap.fromTo(monitorRef.current!.position, { x: 0.5 }, { x: 0, duration: 1, ease: Expo.easeOut });
            gsap.to(monitorRef.current!.rotation, { y: -Math.PI / 2, duration: 2, ease: Expo.easeOut }).then(() => {
                mouseAnimationRef.current = true;
            });
            monitorRef.current!.visible = true;
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
            phoneRef.current!.visible = false;
        } else if (currentSpotlight.type === "computer") {
            gsap.to(monitorRef.current!.position, { x: -2, duration: 1, ease: Expo.easeIn });
            await gsap.to(monitorRef.current!.rotation, { y: Math.PI, duration: 1, ease: Expo.easeIn }).then();
            monitorRef.current!.visible = false;
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
                gltf.scene.visible = false;
                scene.add(gltf.scene);
                phoneRef.current = gltf.scene;
                console.log("done loading phone model");
                showSpotlightItem(SPOTLIGHT[2]);
            });

            gltfLoader.load("monitor.gltf", (gltf) => {
                // gltf.scene.scale.set(0.8, 0.8, 0.8);
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

                gltf.scene.visible = false;
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
        <div style={{ background: "url(/dot2.png)", backgroundRepeat: "repeat", backgroundPosition: "0 50px" }}>
            {/* <div
                className="text-white fixed top-0 left-0 w-full z-10"
                style={{
                    background: "#30007888",
                    backdropFilter: "blur(20px)",
                }}>
                <NavBar />
            </div> */}
            <div
                className="h-screen w-full flex flex-col relative text-white max-w-full overflow-x-hidden "
                style={{
                    background: "url(/blurry-gradient-haikei1.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}>
                <NavBar />
                <div className="overflow-x-hidden absolute top-0 left-0 w-screen h-screen flex flex-col lg:flex-row pointer-events-none">
                    <canvas className="origin-center h-2/3 lg:h-full w-full lg:w-1/2 flex-shrink" ref={canvasRef} />
                    <div className="flex justify-center lg:items-center h-1/3 lg:h-full w-full lg:w-1/2 flex-shrink">
                        <div className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-center lg:text-right ">
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
            <div className="w-full text-white min-h-screen">
                <header className="flex items-center flex-col p-10">
                    <h2 className=" text-4xl font-bold">How we work</h2>
                    <p className="text-2xl opacity-50 mt-4">Your solution in 4 steps</p>
                </header>

                <div className="flex justify-center">
                    <StepsGrid />
                </div>
            </div>
            <div
                className="w-full flex flex-col text-white"
                style={{ background: "url(/blurry-gradient-haikei4.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <header className="flex items-center flex-col p-10">
                    <h2 className=" text-4xl font-bold">Why us</h2>
                    <p className="text-2xl opacity-50 mt-4">Our qualities</p>
                </header>
                <div className="flex justify-center">
                    <QualityGrid />
                </div>
                <div className="h-80">
                    <p className="text-2xl text-center opacity-50 mt-16">Questions and Answers</p>
                    <div className="flex justify-center">
                        <div className="flex items-start justify-center flex-wrap mt-4 max-w-4xl">
                            <QuestionAnswerCard question="Hoe lang duurt ontwikkeling?" answer="Ontwikkelingstijd ligt tussen de 1 en 4 weken." />
                            <QuestionAnswerCard question="Hoe verloopt een meeting?" answer="We meeten via een zoom meeting." />
                            <QuestionAnswerCard
                                question="Hoeveel kost dit?"
                                answer="Kleine projecten kosten 2.000, grotere kunnen meer dan 10.000 kosten."
                            />
                            <QuestionAnswerCard
                                question="Hoe worden kosten berekend?"
                                answer="Door het aantal interactieve elementen in je software op te tellen."
                            />
                        </div>
                    </div>
                </div>
                <div className="relative w-full overflow-x-hidden my-20 h-52 opacity-20">
                    <TechologyStrip />
                </div>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-center">
                    <div className="max-w-7xl w-full">
                        <div className="flex min-h-screen flex-col lg:flex-row">
                            <header className="text-white lg:sticky top-0 left-0 py-20 lg:px-20 lg:self-start lg:w-2/5">
                                <h2 className="text-4xl font-bold text-center lg:text-left">Our solutions</h2>
                                <p className="text-2xl opacity-50 mt-4 text-center lg:text-left">Our creations</p>
                            </header>
                            <div className="flex-grow lg:mt-20">
                                <WorkCard />
                                <WorkCard />
                                <WorkCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="w-full text-white flex items-center justify-center"
                style={{
                    filter: "drop-shadow(0 0 20px #5B00E588)",
                    height: 700,
                    background: "url(/blob-haikei.svg)",
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}>
                <div className="">
                    <h2 className="text-4xl font-bold">Convinced?</h2>
                    <p className="text-2xl opacity-50">Work with us.</p>
                    <button className="px-4 mt-4 text-black font-bold py-1 rounded-lg text-base hover:opacity-80 bg-white">
                        Start here <FontAwesomeIcon icon={faMousePointer} />
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function QuestionAnswerCard(props: { question?: React.ReactNode; answer?: React.ReactNode }) {
    const [shown, setShown] = useState(false);
    return (
        <div className="rounded-lg overflow-hidden m-2 flex-grow">
            <div className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-3 cursor-pointer" onClick={() => setShown(!shown)}>
                <p className="font-bold text-white text-lg flex-grow whitespace-nowrap">{props.question}</p>
                <span className="opacity-50 scale-150 transform ml-6 mr-2">
                    <FontAwesomeIcon icon={faChevronDown} style={{ transform: shown ? "rotate(180deg)" : "rotate(0deg)", transition: "200ms" }} />
                </span>
            </div>
            <div style={{ maxHeight: shown ? "20vh" : "0px", transition: "400ms" }} className="overflow-hidden">
                <div className="px-4 py-3 bg-white bg-opacity-10">{props.answer}</div>
            </div>
        </div>
    );
}

function WorkCard() {
    return (
        <div className="text-white flex-grow mb-8 p-4 lg:p-8 hover:bg-white hover:bg-opacity-10 rounded-xl">
            <h3 className="text-2xl mb-2 font-bold">Onderzoeken ConsumerHouse</h3>
            <p className="opacity-50 mb-5 text-base">Deze website automatiseert het rekruteringsproces van respondenten.</p>
            <div
                className="lg:h-96 h-64 rounded-2xl"
                style={{
                    backgroundImage: "url(/work/consumerhouse-research.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}></div>
        </div>
    );
}
