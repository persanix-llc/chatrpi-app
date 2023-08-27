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


type UseRequestMicrophoneAccess = [
    success: boolean,
    complete: boolean,
    request: () => void
];

export function useRequestMicrophoneAccess(): UseRequestMicrophoneAccess {
    const [ shouldRequestMicrophone, setShouldRequestMicrophone ] = useState(false);
    const [ complete, setComplete ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // Window properties in Next.js static export should be accessed in useEffect()
    useEffect(() => {
        if (shouldRequestMicrophone) {
            (async () => {
                try {
                    const stream = await navigator
                        .mediaDevices
                        .getUserMedia({ video: false, audio: true });
                    // Stop the stream immediately by stopping all tracks
                    stream.getTracks().forEach(track => track.stop());
                    setSuccess(true);
                } catch (error) {
                    console.error("Failed to request microphone access", error);
                    setSuccess(false);
                }
                setShouldRequestMicrophone(false);
                setComplete(true);
            })();
        }
    }, [ shouldRequestMicrophone ]);

    const request = useCallback(() => {
        setComplete(false);
        setSuccess(false);
        setShouldRequestMicrophone(true);
    }, []);

    return [
        success,
        complete,
        request
    ];
}
