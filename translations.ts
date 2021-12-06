export type SpotlightItem = {
    imageUrl: string;
    text: string;
    type: "phone" | "computer";
    texture?: THREE.Texture;
};

export type QuestionAnswer = {
    question: string;
    answer: string;
};

export type Solution = {
    title: string;
    description: string;
    url: string;
    imageUrls: string[];
};

export type Language = {
    spotlightItems: SpotlightItem[];
    questionsAnswers: QuestionAnswer[];
    solutions: Solution[];
    [key: string]: any;
};

export type Languages = {
    [locale: string]: Language;
};

export const LANGUAGE: Languages = {
    nl: {
        weBuild: "Wij bouwen professionele",
        scrollDown: "Scroll voor meer informatie",
        howWeWork: "Hoe wij werken",
        howWeWorkNote: "Jouw software in 4 stappen",
        howWeWorkStep1: "Jouw probleem of idee",
        howWeWorkStep1Note: "Vertel ons jouw probleem of idee dat je ons wilt laten oplossen.",
        howWeWorkStep1Submit: "Verstuur",
        howWeWorkStep1SubmitNote: "We sturen je zo snel mogelijk een antwoord.",
        howWeWorkStep2: "We communiceren",
        howWeWorkStep2Note: "We laten je weten of we geïnteresseerd zijn. In dit geval, plannen we een (online) meeting zodat we elkaar begrijpen.",
        howWeWorkStep3: "We stellen voor",
        howWeWorkStep3Note:
            "We stellen een totaalprijs voor het project voor. De helft van het bedrag moet vooraf betaald worden en de rest na uitwerking.",
        howWeWorkStep4: "We ontwikkelen",
        howWeWorkStep4Note:
            "Wij bouwen het project van start tot eind. We blijven communiceren en aanpassen zodat we allebei blij zijn met de uitkomst.",
        whyUs: "Waarom wij?",
        whyUsNote: "Onze kwaliteiten",
        whyUsItem1: "Snelle Ontwikkeling",
        whyUsItem1Note: "Wij bouwen software in een aantal weken, niet maanden.",
        whyUsItem2: "Modern",
        whyUsItem2Note: "Onze software heeft een moderne look & feel.",
        whyUsItem3: "Responsive",
        whyUsItem3Note: "Onze software heeft de mogelijkheid om op elk apparaat van elke grootte te werken. Zolang het een webbrowser ondersteund.",
        whyUsItem4: "Web/Mobiele Apps",
        whyUsItem4Note: "Onze software werkt in een mobiele app of in de browser. Of beide.",
        questionsAnswersNote: "Vragen en Antwoorden",
        questionsAnswers: [
            {
                question: "Wat soort software maken jullie?",
                answer: "We maken (progressive) Web Apps en Mobile Apps. Web Apps werken in de browser en Mobile Apps op je mobiele telefoon.",
            },
            {
                question: "Hoe lang duurt ontwikkeling?",
                answer: "Ontwikkeltijd hangt af van de moeilijkheidsgraad van het project. Het gemiddelde is rond 4 dagen - 3 weken.",
            },
            {
                question: "Hoeveel gaat dit kosten?",
                answer: "We stellen een totaalprijs voor, we ontwikkelen niet per uur. Gemiddelde projecten kosten tussen €2.000 - €30.000.",
            },
            {
                question: "Hoe werkt de betaling?",
                answer: "Betalingen gebeuren via een IBAN overschrijving. De eerste helft van de totaalprijs moet vooraf betaald worden, de rest na uitwerking.",
            },
            {
                question: "Accepteer je simpele projecten?",
                answer:
                    "Misschien, je kan je idee proberen versturen, Ik laat je weten of ik geïnteresseerd ben. We zullen de volgende types projecten waarschijnlijk niet accepteren: " +
                    "<ul><li>Websites met bijna geen onderdelen, bijvoorbeeld, een WordPress website.</li><li>Software dat het weboot merk zou kunnen schaden.</li></ul>",
            },
        ],
        ourSolutions: "Onze oplossingen",
        ourSolutionsNote: "Software die we gebouwd hebben.",
        solutions: [
            {
                title: "ConsumerHouse Onderzoeken",
                description: "ConsumerHouse wou een manier om het rekruteren van respondenten te automatiseren.",
                url: "https://onderzoeken-consumerhouse.be/",
                imageUrls: ["/work/consumerhouse-research.png"],
            },
            {
                title: "ConsumerHouse Studenten",
                description:
                    "ConsumerHouse wou een manier om het rekruteren van jobstudenten te automatiseren, zodat deze kunnen helpen bij hun onderzoeken.",
                url: "https://studenten-consumerhouse.be/",
                imageUrls: ["/work/consumerhouse-projects.png"],
            },
        ],
        contact: "Contact",
        contactNote: "De eerste stap.",
        contactEmail: "Je e-mail",
        contactName: "Je naam",
        contactDescription: "Je idee of probleem",
        contactSubmit: "Verstuur",
        contactSubmitNote: "We sturen je zo snel mogelijk een antwoord.",
        startHere: "Start hier",
        footerHeader: "Overtuigd?",
        footerHeaderNote: "Werk met ons.",
        footerCompanyNote: "weboot is een geregistreerd bedrijf bij de KVK in Nederland.",
        footerSourceNote: "Website door weboot, source op GitHub",
        spotlightItems: [
            {
                type: "phone",
                imageUrl: "/groen.png",
                text: "automatisatie software",
            },
            {
                type: "phone",
                imageUrl: "/inspections.png",
                text: "productiviteits tools",
            },
            {
                type: "computer",
                imageUrl: "/desktop.png",
                text: "data gedreven dashboards",
            },
        ],
    },
    "en-US": {
        weBuild: "We build professional",
        scrollDown: "Scroll down for more info",
        howWeWork: "How we work",
        howWeWorkNote: "Your solution in 4 steps",
        howWeWorkStep1: "Your problem or idea",
        howWeWorkStep1Note: "Tell us your idea or problem that you want us to solve",
        howWeWorkStep1Submit: "Send",
        howWeWorkStep1SubmitNote: "We'll send you an e-mail back soon.",
        howWeWorkStep2: "We'll communicate",
        howWeWorkStep2Note: "We will let you know if we're interested. If so, we'll plan an (online) meeting to make sure we're on the same page",
        howWeWorkStep3: "We'll propose",
        howWeWorkStep3Note:
            "We will propose a total price for the project. We don't charge hourly. The first half must be paid up front and the other half after launch.",
        howWeWorkStep4: "We'll develop",
        howWeWorkStep4Note:
            "We build software from start to finish. We keep communicating and adjusting to make sure we are both happy with the outcome.",
        whyUs: "Why us",
        whyUsNote: "Our qualities",
        whyUsItem1: "Fast Development",
        whyUsItem1Note: "We build software in one take in a matter of weeks, not months.",
        whyUsItem2: "Modern",
        whyUsItem2Note: "Our software is fast and has a modern look and feel.",
        whyUsItem3: "Responsive",
        whyUsItem3Note: "Our software has the possibility to run on any device of any size, as long as it supports a web browser.",
        whyUsItem4: "Web/Mobile Apps",
        whyUsItem4Note: "Our software runs on a mobile device or in the browser, just like a website.",
        questionsAnswersNote: "Questions and Answers",
        questionsAnswers: [
            {
                question: "What kind of software do you create?",
                answer: "We create (progressive) Web Apps and Mobile Apps. Web Apps run in your webbrowser and Mobile Apps on your phone.",
            },
            {
                question: "How long does development take?",
                answer: "Development time depends on the complexity of the project. It averages at around 4 days - 3 weeks.",
            },
            {
                question: "How much does this cost?",
                // The total price is calculated by counting up all the interactive features on the website.
                answer: "We will propose a total price, we don't charge hourly. Average projects can cost between €2.000 - €30.000.",
            },
            {
                question: "How do payments take place?",
                answer: "Payments are sent via IBAN. The first half of the proposed total price must be paid up front, and the rest after launch.",
            },
            {
                question: "Do you accept simple projects?",
                answer:
                    "Maybe, you can try submitting your idea, I will respond letting you know if I'm interested. We probably won't accept the following types of projects: " +
                    "<ul><li>Websites where the only funcionality is blogging.</li><li>Carefully designed landing pages like this one.</li><li>Websites with almost no custom funcionality, for example, WordPress website.</li><li>Software that could potentially harm the weboot brand.</li></ul>",
            },
            // {
            //     question: "What technologies do you use?",
            //     answer: "We mostly React, React Native, TypeScript, PostgreSQL, NextJS(NodeJS) and TailwindCSS",
            // },
        ],
        ourSolutions: "Our solutions",
        ourSolutionsNote: "Software we've created.",
        solutions: [
            {
                title: "ConsumerHouse Research",
                description: "ConsumerHouse wanted a way to automate the recruitment of their testing users.",
                url: "https://onderzoeken-consumerhouse.be/",
                imageUrls: ["/work/consumerhouse-research.png"],
            },
            {
                title: "ConsumerHouse Students",
                description: "ConsumerHouse wanted a way to automate the recruitment of working students, to help them during their research.",
                url: "https://studenten-consumerhouse.be/",
                imageUrls: ["/work/consumerhouse-projects.png"],
            },
        ],
        contact: "Contact",
        contactNote: "The first step.",
        contactEmail: "Your e-mail",
        contactName: "Your name",
        contactDescription: "Your idea or problem",
        contactSubmit: "Submit",
        contactSubmitNote: "We'll send you a response as soon as possible.",
        startHere: "Start here",
        footerHeader: "Convinced?",
        footerHeaderNote: "Work with us.",
        footerCompanyNote: "weboot is a registered company in the chamber of commerce (Kamer Van Koophandel) of The Netherlands..",
        footerSourceNote: "Website by weboot, source on GitHub",
        spotlightItems: [
            {
                type: "phone",
                imageUrl: "/groen.png",
                text: "automatisation software",
            },
            {
                type: "phone",
                imageUrl: "/inspections.png",
                text: "productivity tools",
            },
            {
                type: "computer",
                imageUrl: "/desktop.png",
                text: "data driven dashboards",
            },
        ],
    },
};
