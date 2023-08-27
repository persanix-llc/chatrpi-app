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

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Banner, Button, ExternalLink } from "@/app/_components";
import { useLocalStorage } from "@/app/_hooks";
import { LocalStorageKey, Path } from "@/app/types";


export default function Welcome() {
    const [ welcomeCompleted ] = useLocalStorage<boolean>(LocalStorageKey.WelcomeCompleted);
    const router = useRouter();

    useEffect(() => {
        if (welcomeCompleted) {
            router.replace(Path.Chatrpi);
        }
    }, [ router, welcomeCompleted ]);

    if (welcomeCompleted) {
        return null;
    }

    return (
        <>
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                Welcome.
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                Chatrpi is a virtual voice assistant from{ " " }
                <ExternalLink to="https://persanix.com">Persanix™</ExternalLink>{ " " }
                that can control your Raspberry Pi.
                Before using Chatrpi, please first please read the following carefully.
            </p>
            <Banner className="animate-fade-in-5 opacity-0 fill-mode-forwards" variant="warning">
                Responses and GPIO control are powered by ChatGPT with minimal oversight.
                It&apos;s possible to damage your Raspberry Pi and anything connected to it using Chatrpi.
                Chatrpi will use your OpenAI key for responses.
                You may exhaust your free trial and incur charges from OpenAI using Chatrpi.
            </Banner>
            <p className="font-body text-gray-100
                          animate-fade-in-6 opacity-0 fill-mode-forwards">
                PERSANIX IS NOT LIABLE FOR ANY DAMAGES OR CHARGES THAT MAY RESULT FROM THE USE OR INSTALLATION OF
                CHATRPI.
                USE CHATRPI AT YOUR OWN RISK.
            </p>
            <p className="font-body text-gray-100
                          animate-fade-in-7 opacity-0 fill-mode-forwards">
                BY CLICKING CONTINUE BELOW YOU AGREE TO OUR{ " " }
                <ExternalLink to="https://persanix.com/disclaimers">WEBSITE DISCLAIMERS</ExternalLink>{ " " }
                ON YOUR OWN BEHALF AND ON BEHALF OF
                ALL PERSONS IN YOUR ORGANIZATION WHO MAY USE THE PERSANIX APPLICATION.
                YOU REPRESENT AND WARRANT THAT YOU HAVE FULL AUTHORITY TO BIND THE ENTITY THAT YOU WORK FOR AND
                YOURSELF TO THESE DISCLAIMERS.
                IF YOU DO NOT AGREE TO THESE DISCLAIMERS AND DO NOT HAVE THE AUTHORITY AS PROVIDED HEREIN,
                DO NOT ACCESS, OR USE THE PERSANIX APPLICATION.
            </p>
            <Button
                className="animate-fade-in-8 opacity-0 fill-mode-forwards"
                to={ Path.WelcomeName }
                fullWidth>
                Continue
            </Button>
        </>
    );
}
