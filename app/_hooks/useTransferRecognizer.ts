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

import "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useCallback, useEffect, useState } from "react";


type Recognizer = speechCommands.TransferSpeechCommandRecognizer;

type UseTransferRecognizer = [
    transferRecognizer: Recognizer | undefined,
    clear: () => void
];

export function useTransferRecognizer(): UseTransferRecognizer {
    const [
        transferRecognizer,
        setTransferRecognizer
    ] = useState<Recognizer | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const baseRecognizer = speechCommands.create("BROWSER_FFT");
            await baseRecognizer.ensureModelLoaded();

            const transferRecognizer = baseRecognizer.createTransfer("chatrpi");
            setTransferRecognizer(transferRecognizer);
        })();
    }, []);

    // Calling transferRecognizer.clearExamples() doesn't remove old labels which will throw an error
    // for 'rawData' on 'undefined' when the example set is serialized. Likely a bug in their code.
    const clear = useCallback(() => {
        if (transferRecognizer && !transferRecognizer.isDatasetEmpty()) {
            const labels = transferRecognizer.wordLabels();
            const examples = labels.flatMap(label => {
                return transferRecognizer.getExamples(label);
            });

            examples.forEach(({ uid }) => {
                transferRecognizer.removeExample(uid);
            });
        }
    }, [ transferRecognizer ]);

    return [ transferRecognizer, clear ];
}
