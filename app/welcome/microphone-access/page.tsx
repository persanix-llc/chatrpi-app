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
import React, { useEffect, useState } from "react";

import { Button, Notification } from "@/app/_components";
import { useNotification, useRequestMicrophoneAccess } from "@/app/_hooks";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { LocalStorageKey, Path } from "@/app/types";


export default function MicrophoneAccess() {
    const [ name ] = useLocalStorage<string>(LocalStorageKey.Name);

    const [ success, complete, requestAccess ] = useRequestMicrophoneAccess();
    const router = useRouter();

    const [ checkingAccess, setCheckingAccess ] = useState(false);
    const [ notification, setNotification ] = useNotification();

    useEffect(() => {
        if (complete) {
            if (success) {
                router.push(Path.WelcomeWakeWord);
            } else {
                setNotification("Chatrpi could not access your microphone");
            }
            setCheckingAccess(false);
        }
    }, [ complete, router, setNotification, success ]);

    async function handleRequestAccess() {
        setCheckingAccess(true);
        requestAccess();
    }

    return (
        <>
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                { name }...
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                Good choice, I like the name { name }.
            </p>
            <p className="text-lg font-body text-gray-100
                          animate-fade-in-5 opacity-0 fill-mode-forwards">
                I&apos;ll need access to your microphone for speech recognition, can you grant me access?
            </p>
            <Button
                className="animate-fade-in-6 opacity-0 fill-mode-forwards"
                fullWidth
                loading={ checkingAccess }
                onClick={ handleRequestAccess }>
                { checkingAccess ? "Granting access" : "Grant access" }
            </Button>
            <Notification>
                { notification }
            </Notification>
        </>
    );
}
