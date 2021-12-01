import { faGit, faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Footer() {
    return (
        <footer className="pt-56 px-20 pb-20 text-white" style={{ background: "url(/layered-steps.svg)", backgroundSize: "stretch" }}>
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
