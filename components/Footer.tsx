import { faGit, faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMousePointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Footer() {
    return (
        <footer className="pt-56 px-10 sm:px-20 pb-20 text-white" style={{ background: "url(/layered-steps.svg)", backgroundSize: "auto 100%" }}>
            <div className="my-20">
                <h2 className="text-4xl font-bold">Convinced?</h2>
                <p className="text-2xl opacity-50">Work with us.</p>
                <a href="#contact">
                    <button className="px-4 mt-4 text-black font-bold py-1 rounded-lg text-base hover:opacity-80 bg-white focus:outline-purple">
                        Start here <FontAwesomeIcon icon={faMousePointer} />
                    </button>
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
                <p className="opacity-50">weboot is a registered company in the chamber of commerce (Kamer Van Koophandel) of The Netherlands.</p>

                <a href="https://github.com/we-boot/website">
                    <p className="opacity-50 mt-2 hover:opacity-100 hover:underline">
                        <FontAwesomeIcon icon={faGithub} /> Website by weboot, source on GitHub
                    </p>
                </a>
            </div>
        </footer>
    );
}
