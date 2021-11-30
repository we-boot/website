import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import { faCode, faComments, faHandLizard, faHandshake, faHandshakeSlash, faLightbulb, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function StepIndicator(props: { children: React.ReactNode; hideStick?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className="font-bold text-3xl  rounded-full w-14 h-14 flex items-center justify-center p-4"
                style={{ backgroundAttachment: "fixed", backgroundImage: "url(/fill.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                {props.children}
            </div>
            {!props.hideStick && (
                <div
                    className="w-3 flex-grow transform scale-y-105"
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
    return <div className="py-3 pl-12 mb-20">{props.children}</div>;
}

export function StepsGrid() {
    return (
        <div style={{ gridTemplateColumns: "max-content 1fr" }} className="grid flex-grow max-w-3xl mx-4">
            <StepIndicator>
                <FontAwesomeIcon icon={faLightbulb} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">
                    <span className="text-white opacity-50">1</span> Your problem or idea
                </h2>
                <p className="opacity-50">Tell us your idea or problem that you want us to solve.</p>
                <div className="mt-4">
                    <textarea className="border-white rounded-lg border-opacity-20 text-white border appearance-none bg-transparent w-full h-32"></textarea>
                    <div className="flex flex-col items-end mt-2">
                        <button className="px-4 py-1 rounded-lg text-base hover:opacity-80" style={{ background: "#6600ff" }}>
                            Send <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                        <p className="text-white opacity-30 text-sm">We'll send you an e-mail back soon.</p>
                    </div>
                </div>
            </StepContainer>
            <StepIndicator>
                <FontAwesomeIcon icon={faComments} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">
                    <span className="text-white opacity-50">2</span> Communication is key
                </h2>
                <p className="opacity-50 mt-2">
                    We'll let you know if we're interested. If so, we'll plan an (online) meeting to make sure we're on the same page.
                </p>
                {/* <p>We plannen een (online) meeting om er voor te zorgen dat we elkaar zeker begrijpen.</p> */}
            </StepContainer>
            <StepIndicator>
                <FontAwesomeIcon icon={faHandshake} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">
                    <span className="text-white opacity-50">3</span> Proposal
                </h2>
                <p className="opacity-50 mt-2">
                    We'll propose a total price for the project. We don't charge hourly. The first half must be paid up front and the other half after
                    launch.
                </p>
            </StepContainer>
            <StepIndicator hideStick>
                <FontAwesomeIcon icon={faCode} />
            </StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">
                    <span className="text-white opacity-50">4</span> Development
                </h2>
                <p className="opacity-50 mt-2">
                    We build the project from start to finish. We keep communicating and adjusting to make sure we're both happy.
                </p>
            </StepContainer>
        </div>
    );
}
