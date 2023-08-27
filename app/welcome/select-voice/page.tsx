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
import React, { useEffect, useMemo, useState } from "react";

import { Button, Loader, Select } from "@/app/_components";
import { SelectOption } from "@/app/_components/Select";
import { useLocalStorage, useSelectVoice } from "@/app/_hooks";
import { LocalStorageKey, Path } from "@/app/types";


export default function SelectVoice() {
    const [ , setWelcomeCompleted ] = useLocalStorage<boolean>(LocalStorageKey.WelcomeCompleted);
    const [ voiceDefaulted, setVoiceDefaulted ] = useState(false);
    const router = useRouter();

    const [
        voicesLoaded,
        voices,
        selectedVoiceUri,
        selectVoiceUri,
        sampleSelectedVoice,
    ] = useSelectVoice();

    // If no selected voice exists on when loaded, default to the first voice
    useEffect(() => {
        if (!voiceDefaulted && voices.length > 0 && !selectedVoiceUri) {
            const defaultVoice = voices[0].voiceURI;
            selectVoiceUri(defaultVoice);
            setVoiceDefaulted(true);
        }
    }, [ selectVoiceUri, selectedVoiceUri, voiceDefaulted, voices ]);

    const selectOptions: SelectOption[] = useMemo(() => {
        return voices.map(voice => {
            return { name: voice.name, value: voice.voiceURI };
        });
    }, [ voices ]);
    const selectElement = useMemo(() => {
        if (!voicesLoaded) {
            return <Loader text="Loading voices"/>;
        }

        return (
            <div className="flex gap-4 w-full">
                <Select
                    className="flex-1"
                    options={ selectOptions }
                    value={ selectedVoiceUri }
                    onChange={ selectVoiceUri }
                />
                <Button
                    variant="secondary"
                    onClick={ sampleSelectedVoice }>
                    Sample
                </Button>
            </div>
        );
    }, [ sampleSelectedVoice, selectOptions, selectVoiceUri, selectedVoiceUri, voicesLoaded ]);

    function handleCompleteSetup() {
        setWelcomeCompleted(true);
        router.push(Path.Chatrpi);
    }

    return (
        <div className="space-y-12 w-full max-w-lg">
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                Excellent.
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                We&apos;re almost finished.
            </p>
            <p className="text-lg font-body text-gray-100
                          animate-fade-in-5 opacity-0 fill-mode-forwards">
                When you converse with me, I&apos;ll normally respond via on-screen text.
                I will also speak to you using speech synthesis.
            </p>
            <div className="space-y-4
                            animate-fade-in-7 opacity-0 fill-mode-forwards">
                <p className="text-lg font-body text-gray-100">
                    When I speak, which voice should I use?
                </p>
                <div className="w-full">
                    { selectElement }
                </div>
            </div>
            <Button
                className="animate-fade-in-8 opacity-0 fill-mode-forwards"
                enabled={ Boolean(voicesLoaded && selectedVoiceUri) }
                onClick={ handleCompleteSetup }
                fullWidth>
                Complete setup
            </Button>
        </div>
    );
}
