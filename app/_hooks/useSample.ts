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

import { usePersistedArrayBuffer } from "@/app/_hooks/usePersistedArrayBuffer";
import { useTransferRecognizer } from "@/app/_hooks/useTransferRecognizer";
import { IndexedDBKey, TransferRecognizerSample } from "@/app/types";


type UseSample = [
    sample: () => Promise<void>,
    clearSamples: () => void,
    isSampling: boolean,
    sampleCount: number
]

export function useSample(persistenceKey: IndexedDBKey, sampleKey: TransferRecognizerSample): UseSample {
    const [
        arrayBuffer,
        arrayBufferLoaded,
        setArrayBuffer,
        clearArrayBuffer
    ] = usePersistedArrayBuffer(persistenceKey);

    const [ transferRecognizer, clearExamples ] = useTransferRecognizer();

    const [ loadedSamples, setLoadedSamples ] = useState(false);

    const [ isSampling, setIsSampling ] = useState(false);
    const [ sampleCount, setSampleCount ] = useState(0);

    // Only load samples once when the persisted array buffer is read
    useEffect(() => {
        if (transferRecognizer && !loadedSamples && arrayBufferLoaded) {
            if (arrayBuffer) {
                transferRecognizer.loadExamples(arrayBuffer, false);
                const sampleCounts = transferRecognizer.countExamples();
                setSampleCount(sampleCounts[sampleKey]);
            } else {
                setSampleCount(0);
            }
            setLoadedSamples(true);
        }
    }, [ loadedSamples, arrayBufferLoaded, arrayBuffer, transferRecognizer, sampleKey ]);

    const sample = useCallback(async () => {
        setIsSampling(true);
        if (transferRecognizer) {
            await transferRecognizer.collectExample(sampleKey);
            const serializedSamples = transferRecognizer.serializeExamples(sampleKey);
            setArrayBuffer(serializedSamples);

            const sampleCounts = transferRecognizer.countExamples();
            setSampleCount(sampleCounts[sampleKey]);
        }
        setIsSampling(false);
    }, [ sampleKey, setArrayBuffer, transferRecognizer ]);

    const clear = useCallback(() => {
        clearArrayBuffer();
        clearExamples();
        setSampleCount(0);
    }, [ clearArrayBuffer, clearExamples ]);

    return [
        sample,
        clear,
        isSampling,
        sampleCount
    ];
}
