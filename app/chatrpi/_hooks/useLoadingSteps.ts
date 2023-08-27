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
import { TransferSpeechCommandRecognizer } from "@tensorflow-models/speech-commands";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocalStorage, usePersistedArrayBuffer, useTransferRecognizer } from "@/app/_hooks";
import { LoadingError, LoadingStep } from "@/app/chatrpi/types";
import { IndexedDBKey, LocalStorageKey } from "@/app/types";


type UseLoadingSteps = [
    loadingStep: LoadingStep,
    begin: () => void,
    error: LoadingError | undefined,
    transferRecognizer: TransferSpeechCommandRecognizer | undefined,
    voice: SpeechSynthesisVoice | undefined
];

export function useLoadingSteps(): UseLoadingSteps {
    const delayStepTimeoutId = useRef<number>();

    const [ step, setStep ] = useState<LoadingStep>("Begin");
    const [ error, setError ] = useState<LoadingError | undefined>(undefined);

    const [ transferRecognizer ] = useTransferRecognizer();
    const [ nameArrayBuffer, nameArrayBufferLoaded ] = usePersistedArrayBuffer(IndexedDBKey.NameSamples);
    const [ backgroundArrayBuffer, backgroundArrayBufferLoaded ] = usePersistedArrayBuffer(IndexedDBKey.BackgroundSamples);

    const [ voice, setVoice ] = useState<SpeechSynthesisVoice | undefined>(undefined);
    const [ voiceUri ] = useLocalStorage<string>(LocalStorageKey.Voice);

    // Clear the delay step timeout on unmount
    useEffect(() => {
        return () => {
            if (delayStepTimeoutId.current) {
                window.clearTimeout(delayStepTimeoutId.current);
            }
        };
    }, []);

    const delayStep = useCallback((loadingStep: LoadingStep) => {
        delayStepTimeoutId.current = window.setTimeout(() => {
            setStep(loadingStep);
        }, 1000);
    }, []);

    const begin = useCallback(() => {
        setStep("Loading samples");
        setError(undefined);
    }, []);

    const loadSamples = useCallback(() => {
        const arrayBuffersLoaded = nameArrayBufferLoaded && backgroundArrayBufferLoaded;
        if (transferRecognizer && arrayBuffersLoaded) {
            if (!nameArrayBuffer) {
                setError("No name samples found.");
            } else if (!backgroundArrayBuffer) {
                setError("No background samples found.");
            } else {
                transferRecognizer.loadExamples(nameArrayBuffer, false);
                transferRecognizer.loadExamples(backgroundArrayBuffer, false);
                delayStep("Training recognizer");
            }
        }
    }, [
        backgroundArrayBuffer,
        backgroundArrayBufferLoaded,
        nameArrayBuffer,
        nameArrayBufferLoaded,
        transferRecognizer,
        delayStep
    ]);

    const trainRecognizer = useCallback(() => {
        if (transferRecognizer) {
            (async () => {
                await transferRecognizer.train({ epochs: 50 });
                delayStep("Loading voice");
            })();
        }
    }, [ transferRecognizer, delayStep ]);

    const loadVoice = useCallback(() => {
        function handleVoicesChanged() {
            const voices = speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => voice.voiceURI === voiceUri);
            if (selectedVoice) {
                setVoice(selectedVoice);
                delayStep("Done");
                speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            } else if (voices?.length > 0) {
                setError("Selected voice not found.");
            }
        }

        const speechSynthesis = window.speechSynthesis;
        speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

        if (voiceUri) {
            handleVoicesChanged();
        }
    }, [ voiceUri, delayStep ]);

    // Progress to the next step if there are no errors
    useEffect(() => {
        if (!error) {
            if (step === "Loading samples") {
                loadSamples();
            } else if (step === "Training recognizer") {
                trainRecognizer();
            } else if (step === "Loading voice") {
                loadVoice();
            }
        }
    }, [
        error,
        step,
        loadSamples,
        trainRecognizer,
        loadVoice
    ]);

    return [
        step,
        begin,
        error,
        transferRecognizer,
        voice
    ];
}
