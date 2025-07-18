import React from "react";
import Layout from "../Layouts/Layout";
import { Link } from "@inertiajs/react";

function Home({ name }) {
    return (
        <>
            <h1 className="text-3xl font-bold">Home page {name}</h1>
            <Link
                preserveScroll
                className="block mt-[1500px] mb-8 text-3xl font-bold text-center"
                href="/"
            >
                {new Date().toLocaleTimeString()}
            </Link>
        </>
    );
}

Home.layout = (page) => <Layout children={page} />;

export default Home;
