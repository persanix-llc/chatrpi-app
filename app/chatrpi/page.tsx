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

import { faGear } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { IconButton } from "@/app/_components";
import { useApiUrl, useSpeechRecognition, useTextToSpeech } from "@/app/_hooks";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { OutrunVisualizer } from "@/app/_visualizers";
import { useLoadingSteps } from "@/app/chatrpi/_hooks";
import { Conversation, ConversationContent, ConversationState } from "@/app/chatrpi/types";
import { LocalStorageKey, Path } from "@/app/types";

import { ConversationBubbles, Initialization } from "./_components";


export default function Chatrpi() {
    const [
        loadingStep,
        startLoading,
        loadingError,
        transferRecognizer,
        voice
    ] = useLoadingSteps();

    const [ name ] = useLocalStorage<string>(LocalStorageKey.Name);
    const [ recognitionProbabilityThreshold ] = useLocalStorage<number>(LocalStorageKey.RecognitionProbabilityThreshold);

    const apiUrl = useApiUrl();

    const [ conversationState, setConversationState ] = useState<ConversationState>("waiting");
    const [ providingInput, setProvidingInput ] = useState(false);
    const [ conversation, setConversation ] = useState<Conversation>([]);
    const [ lastResponse, setLastResponse ] = useState<string>("");

    const recognizeSpeech = useSpeechRecognition();
    const speak = useTextToSpeech(voice);

    const handleRecognition = useCallback(async () => {
        if (transferRecognizer && name && voice) {
            setProvidingInput(true);
            setConversation(conversation => {
                return [
                    ...conversation,
                    {
                        party: "user",
                        text: name,
                        time: Date.now()
                    }
                ];
            });
        }
    }, [ name, transferRecognizer, voice ]);

    const handleUserSpeech = useCallback((query: string) => {
        setConversation(conversation => {
            const conversationPiece: ConversationContent = {
                party: "user",
                text: query,
                time: Date.now()
            };
            return [
                ...conversation,
                conversationPiece
            ];
        });
    }, []);

    const handleChatrpiSpeech = useCallback(async (query: string) => {
        setConversation(conversation => {
            const conversationPiece: ConversationContent = {
                party: "chatrpi",
                text: query,
                time: Date.now()
            };
            return [
                ...conversation,
                conversationPiece
            ];
        });
        setConversationState(() => "responding");
        setLastResponse(() => query);
        await speak(query);
    }, [ speak ]);

    useEffect(() => {
        if (!providingInput && transferRecognizer && name && voice) {
            transferRecognizer
                .listen(handleRecognition, {
                    probabilityThreshold: recognitionProbabilityThreshold,
                    overlapFactor: 0.35
                })
                .then(() => {
                    setConversationState(() => "waiting");
                });
        }
    }, [ providingInput, transferRecognizer, name, voice, handleRecognition, recognitionProbabilityThreshold ]);

    useEffect(() => {
        if (providingInput && transferRecognizer?.isListening() && name && voice) {
            (async () => {
                await transferRecognizer.stopListening();

                await handleChatrpiSpeech("Sir?");

                let continuation = true;
                while (continuation) {
                    setConversationState(() => "listening");
                    const recognizedSpeech = await recognizeSpeech();

                    if (recognizedSpeech) {
                        handleUserSpeech(recognizedSpeech);

                        setConversationState(() => "thinking");

                        try {
                            const response = await axios.post(apiUrl.chat, {
                                message: recognizedSpeech
                            });

                            const data: { message: string, continue: boolean } = response.data;
                            await handleChatrpiSpeech(data.message);

                            continuation = Boolean(data.continue);
                        } catch (error) {
                            await handleChatrpiSpeech(
                                "Apologies, my server requests seem to be failing. " +
                                "Please ensure my server is up and try again."
                            );
                            continuation = false;
                        }
                    } else {
                        handleUserSpeech("gibberish");
                        await handleChatrpiSpeech("I didn't understand that");
                        continuation = false;
                    }
                }

                setProvidingInput(false);
            })();
        }
    }, [
        providingInput,
        transferRecognizer,
        name,
        voice,
        speak,
        recognizeSpeech,
        handleChatrpiSpeech,
        handleUserSpeech,
        apiUrl
    ]);

    const conversationElement = useMemo(() => {
        if (conversation.length === 0) {
            return (
                <p className="absolute right-24 top-24
                              text-xl max-w-sm text-gray-100
                              animate-fade-in-3 opacity-0 fill-mode-forwards">
                    Say { name } to get started
                </p>
            );
        }

        return (
            <ConversationBubbles
                className="flex-1 max-w-md p-6 z-50 w-full my-24
                           border-teal-500 border border-r-0 rounded-l-2xl
                           bg-gray-950 bg-opacity-60 scrollbar"
                conversation={ conversation }
            />
        );
    }, [ conversation, name ]);

    if (loadingStep !== "Done") {
        return (
            <Initialization
                loadingStep={ loadingStep }
                onStart={ startLoading }
                error={ loadingError }
            />
        );
    }

    return (
        <div className="h-screen flex flex-col items-end
                        animate-fade-in-1 opacity-0 fill-mode-forwards">

            <OutrunVisualizer
                className="h-screen w-screen absolute inset-0 z-0"
                conversationState={ conversationState }
            />

            { conversationElement }

            {
                conversationState === "responding" && lastResponse && (
                    <p className="absolute left-1/2 -translate-x-1/2 top-[10%]
                                  rounded-xl bg-gray-950 px-4 py-2
                                  text-2xl max-w-md text-gray-100">
                        { lastResponse }
                    </p>
                )
            }

            <div className="absolute left-0 bottom-0 p-8">
                <IconButton
                    icon={ faGear }
                    to={ Path.Settings }
                />
            </div>
        </div>
    );
}
