import { faGit, faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMousePointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Language } from "../translations";
import { Button } from "./Button";

export function Footer({ language }: { language: Language }) {
    return (
        <footer className="pt-56 px-10 sm:px-20 pb-20 text-white" style={{ background: "url(/layered-steps.svg)", backgroundSize: "auto 100%" }}>
            <div className="my-20">
                <h2 className="text-4xl font-bold">{language.footerHeader}</h2>
                <p className="text-2xl opacity-50">{language.footerHeaderNote}</p>
                <a href="#contact">
                    <Button style={{ marginTop: "1rem" }}>
                        {language.startHere} <FontAwesomeIcon icon={faMousePointer} />
                    </Button>
                </a>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">weboot</h2>

                <a href="mailto:stijn.rogiest@gmail.com">
                    <p className="opacity-50 hover:opacity-100 hover:underline">
                        <FontAwesomeIcon icon={faEnvelope} /> stijn.rogiest<span>@</span>gmail.com
                    </p>
                </a>
                <p className="opacity-50 mt-2">KVK 80384781</p>
                <p className="opacity-50">{language.footerCompanyNote}</p>

                <a href="https://github.com/we-boot/website">
                    <p className="opacity-50 mt-2 hover:opacity-100 hover:underline">
                        <FontAwesomeIcon icon={faGithub} /> {language.footerSourceNote}
                    </p>
                </a>
            </div>
        </footer>
    );
}
