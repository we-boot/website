import React from "react";

export function NavBar() {
    return (
        <nav className="flex">
            <div className="p-5">
                <h1 className="font-bold text-2xl leading-4">weboot</h1>
                <p className="opacity-50 text-lg">we solve digital challenges</p>
            </div>
            <ul className="flex items-center">
                <NavItem onClick={() => window.scrollTo({ behavior: "smooth", top: window.innerHeight })}>How we work</NavItem>
                <NavItem>Why us</NavItem>
                <NavItem>Our solutions</NavItem>
                <NavItem>Contact</NavItem>
                <NavItem>About us</NavItem>
            </ul>
        </nav>
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
