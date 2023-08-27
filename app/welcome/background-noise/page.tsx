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

import { Banner, Button, Notification } from "@/app/_components";
import { useLocalStorage, useNotification, useSample } from "@/app/_hooks";
import { BACKGROUND_SAMPLE_BATCH_SIZE } from "@/app/constants";
import { IndexedDBKey, LocalStorageKey, Path, TransferRecognizerSample } from "@/app/types";


export default function BackgroundNoise() {
    const [ name ] = useLocalStorage<string>(LocalStorageKey.Name);

    const [ sample, clearSamples, isSampling, sampleCount ] = useSample(
        IndexedDBKey.BackgroundSamples,
        TransferRecognizerSample.Background
    );
    const [ notification, setNotification ] = useNotification();
    const router = useRouter();

    function handleClearAll() {
        clearSamples();
        setNotification("Cleared background samples");
    }

    async function handleSampleBackground() {
        for (let i = 0; i < BACKGROUND_SAMPLE_BATCH_SIZE; i++) {
            await sample();
        }
    }

    function handleContinue() {
        router.push(Path.WelcomeSelectVoice);
    }

    return (
        <>
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                Eloquent.
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                Now, I need to get a sense of your environment by sampling some background noise.
            </p>
            <p className="text-lg font-body text-gray-100
                          animate-fade-in-5 opacity-0 fill-mode-forwards">
                It helps if you shuffle around and say words other than { name } as I collect samples.
            </p>
            <div className="space-y-8">
                <p className="text-lg font-body text-gray-100
                              animate-fade-in-6 opacity-0 fill-mode-forwards">
                    I currently have { sampleCount } background samples.{ " " }
                    {
                        sampleCount >= BACKGROUND_SAMPLE_BATCH_SIZE ?
                            "This is enough for now, you can always add more later." :
                            `I need at least ${ BACKGROUND_SAMPLE_BATCH_SIZE }.`
                    }
                </p>
                <Banner className="animate-fade-in-7 opacity-0 fill-mode-forwards" variant="info">
                    Background samples will be collected automatically in batches of { BACKGROUND_SAMPLE_BATCH_SIZE }.
                </Banner>
                <div className="flex gap-x-6
                                animate-fade-in-7 opacity-0 fill-mode-forwards">
                    <Button variant="destructive" onClick={ handleClearAll }>
                        Clear all
                    </Button>
                    <Button
                        className="flex-1"
                        variant="secondary"
                        loading={ isSampling }
                        onClick={ handleSampleBackground }>
                        { isSampling ? "Collecting samples" : "Collect samples" }
                    </Button>
                </div>
            </div>
            <Button
                className="animate-fade-in-7 opacity-0 fill-mode-forwards"
                onClick={ handleContinue }
                enabled={ sampleCount >= BACKGROUND_SAMPLE_BATCH_SIZE }
                fullWidth>
                Continue
            </Button>
            <Notification>
                { notification }
            </Notification>
        </>
    );
}
