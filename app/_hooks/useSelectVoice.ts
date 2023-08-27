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

import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { LocalStorageKey } from "@/app/types";


type UseSelectVoice = [
    loaded: boolean,
    voices: SpeechSynthesisVoice[],
    selectedVoiceUri: string,
    selectVoice: (voiceUri: string) => void,
    sampleVoice: () => void,
    samplingVoice: boolean
];

export function useSelectVoice(): UseSelectVoice {
    const [ selectedVoiceUri, setSelectedVoiceUri ] = useLocalStorage<string>(LocalStorageKey.Voice);

    const [ voices, setVoices ] = useState<SpeechSynthesisVoice[]>([]);
    const [ voicesLoaded, setVoicesLoaded ] = useState(false);

    const [ shouldSampleVoice, setShouldSampleVoice ] = useState(false);
    const [ samplingVoice, setSamplingVoice ] = useState(false);

    // Window properties in Next.js static export should be accessed in useEffect()
    // Load the available voices in the browser
    useEffect(() => {
        function handleLoadVoices() {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoices(voices);
                setVoicesLoaded(true);
                speechSynthesis.removeEventListener("voiceschanged", handleLoadVoices);
            }
        }

        const speechSynthesis = window.speechSynthesis;
        speechSynthesis.addEventListener("voiceschanged", handleLoadVoices);
        handleLoadVoices();

        return () => speechSynthesis.removeEventListener("voiceschanged", handleLoadVoices);
    }, []);

    // Window properties in Next.js static export should be accessed in useEffect()
    // Sample the selected voice when indicated by state change via sample callback
    useEffect(() => {
        if (shouldSampleVoice) {
            setSamplingVoice(true);
            const speechSynthesis = window.speechSynthesis;
            const selectedVoice = voices.find(({ voiceURI }) => voiceURI === selectedVoiceUri);
            if (selectedVoice) {
                const sample = `Hello! This voice is ${ selectedVoice.name }.`;
                const utterance = new SpeechSynthesisUtterance(sample);
                utterance.voice = selectedVoice;
                utterance.onend = () => {
                    setSamplingVoice(false);
                    utterance.onend = null;
                };
                speechSynthesis.speak(utterance);
            }
        }
        setShouldSampleVoice(false);
    }, [ selectedVoiceUri, shouldSampleVoice, voices ]);

    const selectVoice = useCallback((voiceUri: string) => {
        setSelectedVoiceUri(voiceUri);
    }, [ setSelectedVoiceUri ]);

    const sampleVoice = useCallback(() => {
        setShouldSampleVoice(true);
    }, []);

    return [
        voicesLoaded,
        voices,
        selectedVoiceUri,
        selectVoice,
        sampleVoice,
        samplingVoice
    ];
}
