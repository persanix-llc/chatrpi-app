/**
 * Copyright (c) 2020 - 2023 Persanix LLC. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { PropsWithChildren } from "react";

import { Logo } from "@/app/Logo";

import type { Metadata } from "next";


// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
    title: "Chatrpi - Welcome",
    description: "Welcome to Chatrpi.",
};

export default function RootLayout(props: PropsWithChildren<{}>) {
    const { children } = props;
    return (
        <div className="px-12 py-6 h-screen">
            <Logo className="max-w-[15rem]"/>
            <div className="flex flex-col items-center py-32">
                <div className="space-y-12 w-full max-w-lg">
                    { children }
                </div>
            </div>
        </div>
    );
}
