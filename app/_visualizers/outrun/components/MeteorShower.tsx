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

import React, { useMemo } from "react";

import { Meteor } from "@/app/_visualizers/outrun/components";
import { RINGS } from "@/app/_visualizers/outrun/constants";
import { Ring } from "@/app/_visualizers/outrun/types";
import { ConversationState } from "@/app/chatrpi/types";


interface Props {
    conversationState: ConversationState;
}

export function MeteorShower(props: Props) {
    const { conversationState } = props;

    const meteorElements = useMemo(() => {
        // Each meteor is tied to a specific visualizer ring
        return RINGS.map((ring: Ring) => {
            return (
                <Meteor
                    key={ ring }
                    conversationState={ conversationState }
                    ring={ ring }
                />
            );
        });
    }, [ conversationState ]);

    return (
        <group>
            { meteorElements }
        </group>
    );
}

