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

import { useContext } from "react";

import { Button, Notification } from "@/app/_components";
import { useNotification, useSample, } from "@/app/_hooks";
import { SettingsContext } from "@/app/settings/_context";
import { IndexedDBKey, TransferRecognizerSample } from "@/app/types";


export function NameSamples() {
    const { name } = useContext(SettingsContext);

    const [ sample, clearSamples, isSampling, sampleCount ] = useSample(
        IndexedDBKey.NameSamples,
        TransferRecognizerSample.Name
    );

    const [ notification, setNotification ] = useNotification();

    async function handleClearAll() {
        clearSamples();
        setNotification("Cleared name samples");
    }

    async function handleSampleName() {
        await sample();
    }

    return (
        <div className="space-y-3">
            <p className="text-gray-100 font-body text-xl">
                Name samples
            </p>
            <p className="text-gray-100 font-body text-sm">
                Voice samples of you saying the word &apos;{ name }&apos;.
                The more varied samples you add, the more accurate wake-word detection will be.
            </p>
            <p className="text-gray-100 font-body text-sm">
                You currently have { sampleCount } samples.
            </p>
            <div className="pt-2 flex gap-x-6">
                <Button variant="destructive" onClick={ handleClearAll }>
                    Clear all
                </Button>
                <Button
                    className="flex-1"
                    variant="primary"
                    loading={ isSampling }
                    onClick={ handleSampleName }>
                    { isSampling ? `Say ${ name }` : "Add sample" }
                </Button>
            </div>

            <Notification>
                { notification }
            </Notification>
        </div>
    );
}
