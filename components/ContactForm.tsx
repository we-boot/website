import { faCheckCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Language } from "../translations";
import { EMAIL_REGEX } from "../types";
import { Button } from "./Button";

export function ContactForm({ language }: { language: Language }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function submit() {
        if (!valid) return;
        setValid(false);
        let res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                description,
            }),
        });

        if (res.ok) {
            setSubmitted(true);
        } else {
            setValid(true);
        }
    }

    useEffect(() => {
        let valid = name.length > 2 && name.length < 100 && EMAIL_REGEX.test(email) && description.length > 10 && description.length < 30000;
        setValid(valid);
    }, [name, email, description]);

    if (submitted) {
        return (
            <div className="h-80 flex justify-center items-center text-green-400 pop-animation">
                <div className="p-8 bg-green-600 bg-opacity-20 rounded-lg mb-16">
                    <p className="text-4xl text-center font-bold">
                        {language.contactSubmitted} <FontAwesomeIcon icon={faCheckCircle} />
                    </p>
                    <p className="text-2xl text-center opacity-50">{language.contactSubmittedNote}</p>
                </div>
            </div>
        );
    }

    return (
        <form
            className="p-4 md:mx-4 my-4"
            onSubmit={(ev) => {
                ev.preventDefault();
                submit();
            }}>
            <div className="items-center gap-4 grid grid-cols-form-small lg:grid-cols-form">
                <label htmlFor="contact-email" className="text-base font-bold">
                    {language.contactEmail}
                </label>
                <input
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="px-3 min-w-0 py-2 rounded-xl bg-black bg-opacity-50 text-base focus:outline-purple appearance-none"
                    type="email"
                    id="contact-email"
                    name="email"
                />
                <label htmlFor="contact-email" className="text-base font-bold">
                    {language.contactName}
                </label>
                <input
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
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
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                name="description"
                id="contact-description"
                className="block px-3 py-2 rounded-xl w-full h-56 bg-black bg-opacity-50 text-base focus:outline-purple appearance-none"
                style={{ minHeight: 50 }}></textarea>
            <div className="flex items-center mt-4">
                <p className="ml-auto mr-4 opacity-50">{language.contactSubmitNote}</p>
                <Button disabled={!valid} type="submit">
                    {language.contactSubmit} <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </div>
        </form>
    );
}
