import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Language } from "../translations";
import { Button } from "./Button";

export function ContactForm({ language }: { language: Language }) {
    return (
        <form className="p-4 md:mx-4 my-4" onSubmit={() => {}}>
            <div className="items-center gap-4 grid grid-cols-form-small lg:grid-cols-form">
                <label htmlFor="contact-email" className="text-base font-bold">
                    {language.contactEmail}
                </label>
                <input
                    className="px-3 min-w-0 py-2 rounded-xl bg-black bg-opacity-50 text-base focus:outline-purple appearance-none"
                    type="email"
                    id="contact-email"
                    name="email"
                />
                <label htmlFor="contact-email" className="text-base font-bold">
                    {language.contactName}
                </label>
                <input
                    className="px-3 min-w-0 py-2 rounded-xl bg-black bg-opacity-50 text-base focus:outline-purple appearance-none"
                    type="text"
                    id="contact-name"
                    name="name"
                />
            </div>
            <label htmlFor="contact-description" className="block py-2 font-bold">
                {language.contactDescription}
            </label>
            <textarea
                name="description"
                id="contact-description"
                className="block px-3 py-2 rounded-xl w-full h-56 bg-black bg-opacity-50 text-base focus:outline-purple appearance-none"
                style={{ minHeight: 50 }}></textarea>
            <div className="flex items-center mt-4">
                <p className="ml-auto mr-4 opacity-50">{language.contactSubmitNote}</p>
                <Button type="submit">
                    {language.contactSubmit} <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </div>
        </form>
    );
}
