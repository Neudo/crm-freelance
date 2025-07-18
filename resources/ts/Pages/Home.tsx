import React, { ReactElement } from "react";
import Layout from "../Layouts/Layout";
import { Link } from "@inertiajs/react";
import { PageComponent } from "../types";

interface HomeProps {
    name: string;
}

function Home({ name }: HomeProps): ReactElement {
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

(Home as PageComponent).layout = (page: ReactElement) => <Layout children={page} />;

export default Home;
