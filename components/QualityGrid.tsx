import React, { useEffect, useRef } from "react";
import gsap, { Linear } from "gsap";
import {
    TypeScriptIcon,
    NextJsIcon,
    PostgresIcon,
    NodeJSIcon,
    ReactIcon,
    DockerIcon,
    NginxIcon,
    CIcon,
    CSharpIcon,
    JavascriptIcon,
    TailwindCSSIcon,
    ElecronIcon,
    FigmaIcon,
    GitIcon,
    SocketIOIcon,
    ThreeJSIcon,
    UnityIcon,
    AWSIcon,
    LinuxIcon,
} from "./TechnologyIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faHandSparkles, faHourglass, faSign, faSignal, faStar } from "@fortawesome/free-solid-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { Language } from "../translations";

function QualityCard(props: React.HTMLAttributes<HTMLDivElement> & { title: React.ReactNode; description: React.ReactNode }) {
    return (
        <div
            {...props}
            className="h-80 w-72 md:w-80 m-4 relative bg-white bg-opacity-10 flex flex-col overflow-hidden py-4 px-6 rounded-xl lg:hover:scale-110 lg:hover:shadow-xl shadow-none hover:border-transparent transform transition">
            <p className="text-center font-bold text-2xl mb-2">{props.title}</p>
            <p className="opacity-50 text-center text-base">{props.description}</p>
            {props.children}
        </div>
    );
}

// const TECH_ICONS = [<TypeScriptIcon />, <NextJsIcon />, <PostgresIcon />, <NodeJSIcon />, <ReactIcon />, <DockerIcon />, <NginxIcon />, <CIcon />];
export function QualityGrid({ language }: { language: Language }) {
    const clockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let clockTween = gsap.to(clockRef.current!, { rotate: 360, duration: 16, ease: Linear.easeNone }).repeat(-1);
        return () => {
            clockTween.kill();
        };
    }, []);

    return (
        <div className="flex flex-wrap flex-col lg:flex-row max-w-4xl 2xl:max-w-9xl justify-center">
            <QualityCard description={language.whyUsItem1Note} title={language.whyUsItem1}>
                <div className="flex-grow flex justify-center items-center mt-4">
                    <div className="bg-white bg-opacity-10 w-32 h-32 rounded-full relative">
                        <div
                            className=" bg-white bg-opacity-10 h-4 w-16 rounded-lg transform absolute"
                            style={{ top: 56, left: 56, transformOrigin: "8px 8px" }}
                            ref={clockRef}></div>
                    </div>
                </div>
            </QualityCard>
            {/* <QualityCard description="Every application consists of a modern looking user interface." title="Modern"></QualityCard> */}
            <QualityCard description={language.whyUsItem2Note} title={language.whyUsItem2}>
                <div className="flex-grow flex justify-center items-center text-white text-opacity-10">
                    <FontAwesomeIcon size={"8x"} icon={faStar} />
                </div>
            </QualityCard>
            <QualityCard description={language.whyUsItem3Note} title={language.whyUsItem3}>
                <div className="flex justify-center flex-grow my-8">
                    <div className="bg-white bg-opacity-10 rounded-lg w-28 relative">
                        <div className="bg-white bg-opacity-10 rounded-lg w-16 h-20 absolute bottom-0 left-0"></div>
                    </div>
                </div>
            </QualityCard>
            <QualityCard description={language.whyUsItem4Note} title={language.whyUsItem4}>
                <div className="flex-grow flex justify-center items-center mt-4 text-white text-opacity-10">
                    <FontAwesomeIcon size={"8x"} icon={faChrome} />
                </div>
            </QualityCard>
        </div>
    );
}
