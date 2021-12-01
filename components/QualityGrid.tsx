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

    useEffect(() => {
        technologyTween.current = gsap
            .fromTo(
                techonologiesRef.current,
                { x: -56, duration: TECH_ICONS.length + 1, ease: Linear.easeNone },
                { x: -56 * (TECH_ICONS.length + 1), duration: TECH_ICONS.length + 1, ease: Linear.easeNone }
            )
            .repeat(-1);
        return () => {
            technologyTween.current!.kill();
        };
    }, []);

    return (
        <div style={{ gridTemplateColumns: "repeat(2, 300px)", gridTemplateRows: "repeat(5, 300px)" }} className="grid gap-10 ">
            <QualityCard
                description="We are productivity freaks. Software is built in one take in a matter of weeks, not months."
                title="Development time"></QualityCard>
            <QualityCard description="Every application consists of a modern looking user interface." title="Modern"></QualityCard>
            <QualityCard description="We build software using the following tech" title="We speak">
                <div
                    className="relative mt-4"
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
            </QualityCard>
            <QualityCard description="Our software runs on any device of any size, as long as it supports a web browser." title="Responsive">
                <div className="flex justify-center flex-grow">
                    <div className="bg-white bg-opacity-10 rounded-lg w-28 relative">
                        <div className="bg-white bg-opacity-10 rounded-lg w-8 h-12 absolute bottom-0 left-0"></div>
                    </div>
                </div>
            </QualityCard>
            <QualityCard description="Our software updates automatically, the user won't even notice." title="Updates"></QualityCard>
            <QualityCard
                description="Because our software runs in the cloud, it has the possibility to be reached from any location."
                title="Reachable"></QualityCard>
        </div>
    );
}
