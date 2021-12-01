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
import { faArrowDown, faHourglass, faSign, faSignal } from "@fortawesome/free-solid-svg-icons";

function QualityCard(props: React.HTMLAttributes<HTMLDivElement> & { title: React.ReactNode; description: React.ReactNode }) {
    return (
        <div
            {...props}
            style={{ background: "#242424" }}
            className="relative flex flex-col overflow-hidden border border-black py-4 px-6 rounded-xl hover:scale-110 hover:shadow-xl shadow-none hover:border-transparent transform transition">
            <p className="text-center font-bold text-xl mb-2">{props.title}</p>
            <p className="opacity-50 text-center text-base">{props.description}</p>
            {props.children}
        </div>
    );
}

// const TECH_ICONS = [<TypeScriptIcon />, <NextJsIcon />, <PostgresIcon />, <NodeJSIcon />, <ReactIcon />, <DockerIcon />, <NginxIcon />, <CIcon />];
const TECH_ICONS = [
    { name: "TypeScript", icon: <TypeScriptIcon /> },
    { name: "NextJS", icon: <NextJsIcon /> },
    { name: "PostgreSQL", icon: <PostgresIcon /> },
    { name: "NodeJS", icon: <NodeJSIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "Docker", icon: <DockerIcon /> },
    { name: "Nginx", icon: <NginxIcon /> },
    { name: "C", icon: <CIcon /> },
    { name: "C#", icon: <CSharpIcon /> },
    { name: "Javascript", icon: <JavascriptIcon /> },
    { name: "Tailwind CSS", icon: <TailwindCSSIcon /> },
    { name: "Electron", icon: <ElecronIcon /> },
    { name: "Figma", icon: <FigmaIcon /> },
    { name: "Git", icon: <GitIcon /> },
    { name: "Socket.io", icon: <SocketIOIcon /> },
    { name: "THREE.js", icon: <ThreeJSIcon /> },
    { name: "Unity", icon: <UnityIcon /> },
    { name: "Amazon Web Services", icon: <AWSIcon /> },
    { name: "Linux", icon: <LinuxIcon /> },
];

function TechnologyIcon(props: React.HTMLAttributes<HTMLSpanElement>) {
    return <span {...props} className="inline-block m-2 h-10 w-10"></span>;
}

export function QualityGrid() {
    const techonologiesRef = useRef<HTMLDivElement>(null);
    const technologyTween = useRef<gsap.core.Tween>();
    const clockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        technologyTween.current = gsap
            .fromTo(
                techonologiesRef.current,
                { x: -56, duration: TECH_ICONS.length + 1, ease: Linear.easeNone },
                { x: -56 * (TECH_ICONS.length + 1), duration: TECH_ICONS.length + 1, ease: Linear.easeNone }
            )
            .repeat(-1);

        let clockTween = gsap.to(clockRef.current!, { rotate: 360, duration: 16, ease: Linear.easeNone }).repeat(-1);
        return () => {
            technologyTween.current!.kill();
            clockTween.kill();
        };
    }, []);

    return (
        <div style={{ gridTemplateColumns: "repeat(2, 300px)", gridTemplateRows: "repeat(5, 300px)" }} className="grid gap-10 ">
            <QualityCard
                description="We are productivity freaks. Software is built in one take in a matter of weeks, not months."
                title="Development time">
                <div className="flex-grow flex justify-center mt-4">
                    <div className="bg-white bg-opacity-10 w-32 h-32 rounded-full relative">
                        <div
                            className=" bg-white bg-opacity-10 h-4 w-16 rounded-lg transform absolute"
                            style={{ top: 56, left: 56, transformOrigin: "8px 8px" }}
                            ref={clockRef}></div>
                    </div>
                </div>
            </QualityCard>
            {/* <QualityCard description="Every application consists of a modern looking user interface." title="Modern"></QualityCard> */}
            <QualityCard description="Our software updates automatically, the user won't even notice." title="Updates">
                <div className="flex-grow flex justify-center mt-4 text-white text-opacity-10">
                    <FontAwesomeIcon size={"8x"} icon={faArrowDown} />
                </div>
            </QualityCard>
            <QualityCard
                description="Our software has the possibility to run on any device of any size, as long as it supports a web browser."
                title="Responsive">
                <div className="flex justify-center flex-grow mt-4">
                    <div className="bg-white bg-opacity-10 rounded-lg w-28 relative">
                        <div className="bg-white bg-opacity-10 rounded-lg w-16 h-20 absolute bottom-0 left-0"></div>
                    </div>
                </div>
            </QualityCard>
            <QualityCard
                description="Because our software runs in the cloud, it has the possibility to be reached from any location."
                title="Reachable">
                <div className="flex-grow flex justify-center mt-4 text-white text-opacity-10">
                    <FontAwesomeIcon size={"8x"} icon={faSignal} />
                </div>
            </QualityCard>
            <QualityCard description="We build software using the following tech" title="We speak">
                <div className="flex-grow flex flex-col justify-center">
                    <div
                        className="relative mb-10"
                        onMouseEnter={() => technologyTween.current!.pause()}
                        onMouseLeave={() => technologyTween.current!.resume()}>
                        <div ref={techonologiesRef} className="absolute top-0 left-0 min-w-max">
                            {TECH_ICONS.map((e, i) => (
                                <TechnologyIcon title={e.name}>{e.icon}</TechnologyIcon>
                            ))}
                            {TECH_ICONS.map((e, i) => (
                                <TechnologyIcon title={e.name}>{e.icon}</TechnologyIcon>
                            ))}
                        </div>
                    </div>
                </div>
            </QualityCard>
        </div>
    );
}
