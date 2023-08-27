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

import clsx from "clsx";
import React, { useEffect, useMemo, useRef } from "react";

import { useLocalStorage } from "@/app/_hooks";
import { ConversationBubble } from "@/app/chatrpi/_components";
import { Conversation } from "@/app/chatrpi/types";
import { LocalStorageKey } from "@/app/types";


interface Props {
    conversation: Conversation;
    className?: string;
}

export function ConversationBubbles(props: Props) {
    const { conversation, className } = props;

    const [ name ] = useLocalStorage<string>(LocalStorageKey.Name);

    const conversationRef = useRef<HTMLDivElement>(null);

    const conversationBubbleElements = useMemo(() => {
        return conversation.map(content => {
            const { party, text, time } = content;
            return (
                <ConversationBubble
                    key={ `${ party }-${ text }-${ time }` }
                    content={ content }
                    name={ name }
                />
            );
        });
    }, [ conversation, name ]);

    useEffect(() => {
        const conversationContainer = conversationRef.current;
        if (conversationContainer) {
            conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }
    }, [ conversation ]);

    return (
        <div
            ref={ conversationRef }
            className={ clsx(
                "space-y-6 flex overflow-auto flex-col",
                className
            ) }>
            { conversationBubbleElements }
        </div>
    );
}
