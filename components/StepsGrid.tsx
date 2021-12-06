import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faComments,
    faHandLizard,
    faHandshake,
    faHandshakeSlash,
    faLightbulb,
    faMousePointer,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Language } from "../translations";
import { Button } from "./Button";

function StepIndicator(props: { children: React.ReactNode; hideStick?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className="font-bold text-3xl rounded-full w-16 h-16 flex items-center justify-center p-4"
                style={{ backgroundAttachment: "fixed", backgroundImage: "url(/fill.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                {props.children}
            </div>
            {!props.hideStick && (
                <div
                    // transform scale-y-105 does not work in firefox
                    className="w-3 flex-grow"
                    style={{
                        backgroundAttachment: "fixed",
                        backgroundImage: "url(/fill.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}></div>
            )}
        </div>
    );
}

function StepContainer(props: { children: React.ReactNode }) {
    return <div className="py-3 pl-6 md:pl-12 mb-20">{props.children}</div>;
}

export function StepsGrid({ language }: { language: Language }) {
    return (
        <div style={{ gridTemplateColumns: "max-content 1fr" }} className="grid flex-grow max-w-3xl mx-4">
            <StepIndicator>
                <FontAwesomeIcon icon={faLightbulb} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-2xl font-bold">
                    <span className="text-white opacity-50">1</span> {language.howWeWorkStep1}
                </h2>
                <p className="opacity-50 mt-3 text-lg">{language.howWeWorkStep1Note}</p>
                {/* <div className="mt-4">
                    <textarea className="border-white rounded-lg border-opacity-20 text-white border appearance-none bg-transparent w-full h-32"></textarea>
                    <div className="flex flex-col items-end mt-2">
                        <button className="px-4 py-1 rounded-lg text-base hover:opacity-80" style={{ background: "#6600ff" }}>
                            {language.howWeWorkStep1Submit} <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                        <p className="text-white opacity-30 text-sm">{language.howWeWorkStep1SubmitNote}</p>
                    </div>
                </div> */}
                <a href="#contact">
                    <Button style={{ marginTop: "1rem" }}>
                        Start here <FontAwesomeIcon icon={faMousePointer} />
                    </Button>
                </a>
            </StepContainer>
            <StepIndicator>
                <FontAwesomeIcon icon={faComments} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-2xl font-bold">
                    <span className="text-white opacity-50">2</span> {language.howWeWorkStep2}
                </h2>
                <p className="opacity-50 mt-3 text-lg">{language.howWeWorkStep2Note}</p>
                {/* <p>We plannen een (online) meeting om er voor te zorgen dat we elkaar zeker begrijpen.</p> */}
            </StepContainer>
            <StepIndicator>
                <FontAwesomeIcon icon={faHandshake} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-2xl font-bold">
                    <span className="text-white opacity-50">3</span> {language.howWeWorkStep3}
                </h2>
                <p className="opacity-50 mt-3 text-lg">{language.howWeWorkStep3Note}</p>
            </StepContainer>
            <StepIndicator hideStick>
                <FontAwesomeIcon icon={faCode} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-2xl font-bold">
                    <span className="text-white opacity-50">4</span> {language.howWeWorkStep4}
                </h2>
                <p className="opacity-50 mt-3 text-lg">{language.howWeWorkStep4Note}</p>
            </StepContainer>
        </div>
    );
}
