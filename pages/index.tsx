import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import THREE from "three";

export default function Home() {
    // return <div style={{ backgroundImage: "url(/gradient.svg)", backgroundSize: "cover", minHeight: "100vh", width: "100%" }}></div>;
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
                    <div className="flex-grow">canvas here</div>
                    <div className="flex-grow">text here</div>
                </div>
            </div>
            {/* <div>next page here</div> */}
        </div>
    );
}
