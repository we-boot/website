import React from "react";

export function NavBar() {
    function scrollToId(id: string) {
        location.hash = id;
        // document.getElementById(id)!.scrollIntoView({ behavior: "smooth" });
        // setTimeout(() => (location.hash = id), 1000);
    }

    return (
        <nav className="flex">
            <header className="p-5">
                <h1 className="font-bold text-2xl leading-4">weboot</h1>
                <p className="opacity-50 text-lg">we solve digital challenges</p>
            </header>
            <ul className="flex items-center">
                <NavItem onClick={() => scrollToId("how-we-work")}>How we work</NavItem>
                <NavItem onClick={() => scrollToId("why-us")}>Why us</NavItem>
                <NavItem onClick={() => scrollToId("our-solutions")}>Our solutions</NavItem>
                <NavItem onClick={() => scrollToId("contact")}>Contact</NavItem>
            </ul>
            <div className="ml-auto flex mx-5 items-center">
                <ul className="overflow-hidden rounded-lg">
                    <LanguageItem href="/nl">NL</LanguageItem>
                    <LanguageItem href="/en-US">EN</LanguageItem>
                </ul>
            </div>
        </nav>
    );
}

export function LanguageItem(props: React.HTMLAttributes<HTMLSpanElement> & { href: string }) {
    return (
        <a href={props.href}>
            <li
                {...props}
                className="bg-white inline-block bg-opacity-20 py-2 px-3 opacity-80 font-bold text-sm hover:bg-opacity-30 cursor-pointer"></li>
        </a>
    );
}

export function NavItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
    return (
        <li
            {...props}
            className="bg-white hidden lg:block bg-opacity-20 py-2 px-3 rounded-lg opacity-80 font-bold text-sm hover:bg-opacity-30 cursor-pointer mx-1.5">
            {props.children}
        </li>
    );
}
