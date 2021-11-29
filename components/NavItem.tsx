import React from "react";

export function NavBar() {
    return (
        <nav className="flex">
            <div className="p-5">
                <h1 className="font-bold text-2xl leading-4">weboot</h1>
                <p className="opacity-50 text-lg">we solve digital challenges</p>
            </div>
            <ul className="flex items-center">
                <NavItem>How we work</NavItem>
                <NavItem>Why us</NavItem>
                <NavItem>Our solutions</NavItem>
                <NavItem>Contact</NavItem>
                <NavItem>About us</NavItem>
            </ul>
        </nav>
    );
}

export function NavItem(props: { children: React.ReactNode }) {
    return (
        <li className="bg-white bg-opacity-20 py-2 px-3 rounded-lg opacity-80 font-bold text-sm hover:bg-opacity-30 cursor-pointer mx-1.5">
            {props.children}
        </li>
    );
}
