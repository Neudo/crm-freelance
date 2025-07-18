import { Link } from "@inertiajs/react";
import React from "react";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer></footer>
        </>
    );
}
