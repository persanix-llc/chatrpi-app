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

import { Button, Notification } from "@/app/_components";
import { useNotification, useSample } from "@/app/_hooks";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { IndexedDBKey, LocalStorageKey, Path, TransferRecognizerSample } from "@/app/types";


export default function WakeWord() {
    const [ name ] = useLocalStorage<string>(LocalStorageKey.Name);

    const [ sample, clearSamples, isSampling, sampleCount ] = useSample(
        IndexedDBKey.NameSamples,
        TransferRecognizerSample.Name
    );

    const [ notification, setNotification ] = useNotification();
    const router = useRouter();

    function handleClearAll() {
        clearSamples();
        setNotification("Cleared name samples");
    }

    async function handleSampleName() {
        await sample();
    }

    function handleContinue() {
        router.push(Path.WelcomeBackgroundNoise);
    }

    const enoughSamplesCollected = sampleCount >= 4;

    return (
        <>
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                Thank you.
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                I need to hear how you pronounce { name } so I can wake up when I hear it.
            </p>
            <div className="space-y-8">
                <p className="text-lg font-body text-gray-100
                              animate-fade-in-5 opacity-0 fill-mode-forwards">
                    I currently have { sampleCount } name samples.{ " " }
                    {
                        enoughSamplesCollected ?
                            "This is enough for now, you can always add more later." :
                            "I need at least four."
                    }
                </p>
                <div className="flex gap-x-6
                                animate-fade-in-6 opacity-0 fill-mode-forwards">
                    <Button variant="destructive" onClick={ handleClearAll }>
                        Clear all
                    </Button>
                    <Button
                        className="flex-1"
                        variant="secondary"
                        loading={ isSampling }
                        onClick={ handleSampleName }>
                        { isSampling ? `Say ${ name }` : "Add sample" }
                    </Button>
                </div>
            </div>
            <Button
                className="animate-fade-in-6 opacity-0 fill-mode-forwards"
                onClick={ handleContinue }
                enabled={ enoughSamplesCollected }
                fullWidth>
                Continue
            </Button>
            <Notification>
                { notification }
            </Notification>
        </>
    );
}
