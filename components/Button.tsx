import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className="px-4 text-black font-bold py-1 rounded-lg text-base hover:opacity-80 bg-white focus:outline-purple disabled:bg-opacity-50 whitespace-nowrap"
        />
    );
}
