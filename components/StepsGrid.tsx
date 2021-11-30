import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function StepIndicator(props: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center" style={{ minHeight: 150 }}>
            <div className="font-bold text-4xl bg-white bg-opacity-20 rounded-full w-14 h-14 flex items-center justify-center">{props.children}</div>
            <div className="w-3 flex-grow bg-white bg-opacity-20"></div>
        </div>
    );
}

function StepContainer(props: { children: React.ReactNode }) {
    return <div className="py-2 pl-12">{props.children}</div>;
}

export function StepsGrid() {
    return (
        <div style={{ gridTemplateColumns: "max-content 1fr" }} className="grid flex-grow max-w-3xl mx-4">
            <StepIndicator>1</StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">Your problem</h2>
                <p>Tell us your idea or problem</p>
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
            <StepIndicator>2</StepIndicator>
            <StepContainer>
                <h2 className="text-xl font-bold">Your problem</h2>
                <p>Tell us your idea or problem</p>
            </StepContainer>
        </div>
    );
}
