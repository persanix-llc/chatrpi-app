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

import React, { useEffect, useState } from "react";

import { OutrunVisualizer } from "@/app/_visualizers";
import { ConversationState } from "@/app/chatrpi/types";


export default function OutrunVisualizerSandbox() {
    const [
        conversationState,
        setConversationState
    ] = useState<ConversationState>("listening");

    // Change the conversation state over a consistent interval
    useEffect(() => {
        const interval = setInterval(() => {
            setConversationState(oldState => {
                if (oldState === "waiting") return "listening";
                if (oldState === "listening") return "thinking";
                if (oldState === "thinking") return "responding";
                return "waiting";
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <OutrunVisualizer
                className="h-screen w-screen"
                conversationState={ conversationState }
            />
        </>
    );
}
