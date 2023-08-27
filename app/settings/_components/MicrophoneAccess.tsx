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

import { useEffect, useState } from "react";

import { Button, Notification } from "@/app/_components";
import { useNotification } from "@/app/_hooks";
import { useRequestMicrophoneAccess } from "@/app/_hooks/useRequestMicrophoneAccess";


export function MicrophoneAccess() {
    const [ success, complete, requestAccess ] = useRequestMicrophoneAccess();
    const [ checkingAccess, setCheckingAccess ] = useState(false);
    const [ notification, setNotification ] = useNotification();

    useEffect(() => {
        if (complete) {
            if (success) {
                setNotification("Chatrpi successfully accessed your microphone");
            } else {
                setNotification("Chatrpi could not access your microphone");
            }
            setCheckingAccess(false);
        }
    }, [ complete, setNotification, success ]);

    async function handleCheckAccess() {
        setCheckingAccess(true);
        requestAccess();
    }

    return (
        <div className="space-y-3">
            <p className="text-gray-100 font-body text-xl">
                Microphone access
            </p>
            <p className="text-gray-100 font-body text-sm">
                Chatrpi requires access to the browser&apos;s microphone.
                If you previously rejected access, reset your browser settings for this page.
            </p>
            <Button
                fullWidth
                loading={ checkingAccess }
                onClick={ handleCheckAccess }>
                { checkingAccess ? "Checking access" : "Check access" }
            </Button>
            <Notification>
                { notification }
            </Notification>
        </div>
    );
}
