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


export function useSpeechRecognition() {
    const [
        speechRecognition,
        setSpeechRecognition
    ] = useState<SpeechRecognition | undefined>(undefined);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const speechRecognition = new SpeechRecognition();
        speechRecognition.continuous = false;
        speechRecognition.lang = "en-US";
        setSpeechRecognition(speechRecognition);
    }, []);

    return useCallback(() => {
        return new Promise<string | null>((resolve) => {
            if (speechRecognition) {
                speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
                    const { results } = event;
                    if (results?.length > 0) {
                        const lastResult = results[results.length - 1];
                        const firstAlternative = lastResult[0];

                        if (lastResult.isFinal && firstAlternative) {
                            resolve(firstAlternative.transcript);
                        }

                        speechRecognition.onresult = null;
                        speechRecognition.onnomatch = null;
                        speechRecognition.onerror = null;
                        speechRecognition.onend = null;
                        speechRecognition.stop();
                    }
                };

                speechRecognition.onnomatch = () => resolve(null);
                speechRecognition.onerror = () => resolve(null);
                speechRecognition.onend = () => resolve(null);
                speechRecognition.start();
            }
        });
    }, [ speechRecognition ]);
}
