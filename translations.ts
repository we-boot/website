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
