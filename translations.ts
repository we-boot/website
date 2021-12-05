export type SpotlightItem = {
    imageUrl: string;
    text: string;
    type: "phone" | "computer";
    texture?: THREE.Texture;
};

export type Language = {
    spotlightItems: SpotlightItem[];
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
                text: "Data gedreven dashboards",
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
