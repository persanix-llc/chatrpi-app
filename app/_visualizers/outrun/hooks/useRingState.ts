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

import { useCallback } from "react";

import { Ring } from "@/app/_visualizers/outrun/types";
import { ConversationState, RingState } from "@/app/chatrpi/types";

import { BLUE, INDIGO, TEAL, YELLOW } from "../constants";


/**
 * Returns a {@link RingState} for a specific ring and conversation state.
 *
 * Each ring in the outrun visualizer will have state-dependent properties
 * which will be consumed by the rings and other visual components.
 *
 * @returns {(ring: Ring, conversationState: ConversationState) => RingState}
 */
export function useRingState(): (ring: Ring, conversationState: ConversationState) => RingState {
    // Return a callback here so a component can lazily call/memoize the result
    return useCallback((ring: Ring, conversationState: ConversationState) => {
        switch (ring) {
            case "single":
                if (conversationState === "listening") {
                    return {
                        color: YELLOW,
                        speed: -1.5,
                        position: [ 2.5, 2.5, 0 ]
                    };
                } else if (conversationState === "thinking") {
                    return {
                        color: BLUE,
                        speed: -2,
                        position: [ 3, 3, 0 ]
                    };
                } else if (conversationState === "responding") {
                    return {
                        color: INDIGO,
                        speed: -2.5,
                        position: [ 3, 3, 0 ]
                    };
                } else {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 2, 2, 0 ]
                    };
                }
            case "double" :
                if (conversationState === "listening") {
                    return {
                        color: YELLOW,
                        speed: -2,
                        position: [ 3.5, 3.5, 0 ]
                    };
                } else if (conversationState === "thinking") {
                    return {
                        color: BLUE,
                        speed: -2,
                        position: [ 3, 3, 0 ]
                    };
                } else if (conversationState === "responding") {
                    return {
                        color: INDIGO,
                        speed: -2.5,
                        position: [ 3, 3, 0 ]
                    };
                } else {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 1, 1, 0 ]
                    };
                }
            case "triple" :
                if (conversationState === "listening") {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 0, 0, 0 ]
                    };
                } else if (conversationState === "thinking") {
                    return {
                        color: BLUE,
                        speed: -2,
                        position: [ 4, 4, 0 ]
                    };
                } else if (conversationState === "responding") {
                    return {
                        color: INDIGO,
                        speed: -2.5,
                        position: [ 2, 2, 0 ]
                    };
                } else {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 0, 0, 0 ]
                    };
                }
            case "quad":
                if (conversationState === "thinking") {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 0, 0, 0 ]
                    };
                } else if (conversationState === "responding") {
                    return {
                        color: INDIGO,
                        speed: -2.5,
                        position: [ 2, 2, 0 ]
                    };
                } else {
                    return {
                        color: TEAL,
                        speed: 1,
                        position: [ 0, 0, 0 ]
                    };
                }
            default:
                return {
                    color: TEAL,
                    speed: 1,
                    position: [ -5, 0, 0 ]
                };
        }
    }, []);
}
