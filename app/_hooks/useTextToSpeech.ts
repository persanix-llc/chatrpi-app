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


export function useTextToSpeech(voice?: SpeechSynthesisVoice) {
    const [ shouldToggle, setShouldToggle ] = useState(false);
    const [
        utterance,
        setUtterance
    ] = useState<SpeechSynthesisUtterance | undefined>(undefined);

    // Window properties in Next.js static export should be accessed in useEffect()
    // Use speech synthesis to speak the utterance
    useEffect(() => {
        if (utterance) {
            window.speechSynthesis.speak(utterance);
            setUtterance(undefined);
        }
    }, [ utterance ]);

    // Window properties in Next.js static export should be accessed in useEffect()
    // Toggle speech synthesis off and on periodically (Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=335907)
    useEffect(() => {
        let timeoutId: number | undefined = undefined;

        function toggle() {
            if (speechSynthesis) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
                timeoutId = window.setTimeout(toggle, 5000);
            }
        }

        if (shouldToggle) {
            timeoutId = window.setTimeout(toggle, 5000);
        } else {
            window.clearTimeout(timeoutId);
        }

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [ shouldToggle ]);

    return useCallback((text: string) => {
        return new Promise<void>((resolve) => {
            if (!voice || !text) {
                resolve();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = voice;
            utterance.onend = () => {
                setShouldToggle(false);
                resolve();

                utterance.onend = null;
                utterance.onerror = null;
            };
            utterance.onerror = (error) => {
                setShouldToggle(false);
                resolve();
                console.error("Failed speech synthesis utterance", error);
            };
            setUtterance(utterance);
        });
    }, [ voice ]);
}
