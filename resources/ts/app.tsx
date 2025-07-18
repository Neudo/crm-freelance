import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ReactElement } from "react";
import Layout from "./Layouts/Layout";
import { PageComponent } from "./types";

createInertiaApp({
    resolve: (name: string) => {
        const pages = import.meta.glob<{ default: PageComponent }>("./Pages/**/*.tsx", { eager: true });
        const page = pages[`./Pages/${name}.tsx`];
        page.default.layout =
            page.default.layout || ((page: ReactElement) => <Layout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        if (el) {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: {
        color: "#ff4455",
    },
});
