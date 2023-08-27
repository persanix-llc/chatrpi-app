import "./globals.css";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import { inter, montserrat } from "@/app/fonts";


export default function RootLayout(props: PropsWithChildren<{}>) {
    const { children } = props;
    return (
        <html lang="en">
            <body className={ clsx(inter.variable, montserrat.variable, "bg-background") }>
                <main className="min-h-screen">
                    { children }
                </main>
            </body>
        </html>
    );
}
