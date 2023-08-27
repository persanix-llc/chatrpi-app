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
import React, { useMemo } from "react";

import { ConversationContent, ConversationParty } from "@/app/chatrpi/types";


const PartyStylesMap: Record<ConversationParty, string> = {
    "user": " border-blue-500 bg-blue-950",
    "chatrpi": "border-teal-500 bg-teal-950",
} as const;
const PartyAlignmentMap: Record<ConversationParty, string> = {
    "user": "self-end",
    "chatrpi": "self-start",
} as const;

interface Props {
    content: ConversationContent;
    name: string;
    className?: string;
}

export function ConversationBubble(props: Props) {
    const { content, name, className } = props;
    const { party, text, time } = content;

    const partyStyles = PartyStylesMap[party];
    const partyAlignment = PartyAlignmentMap[party];
    const displayName = party === "user" ? "You" : name;

    const textElement = useMemo(() => {
        if (text === "gibberish") {
            return <span className="italic">&lt;gibberish&gt;</span>;
        }
        return <span className="first-letter:uppercase block">{ text }</span>;
    }, [ text ]);
    const formattedDate = useMemo(() => {
        return new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }, [ time ]);

    return (
        <div className={ clsx(
            "flex flex-col w-full px-1",
            "animate-fade-in",
            className
        ) }>
            <p className={ clsx(
                "rounded-lg px-6 py-2 max-w-sm border text-gray-100",
                partyStyles,
                partyAlignment
            ) }>
                { textElement }
            </p>
            <div className={ clsx("mt-1.5 mx-0.5 font-body text-xs text-gray-100 space-x-1.5", partyAlignment) }>
                <span>{ displayName }</span>
                <span>{ formattedDate }</span>
            </div>
        </div>
    );
}
