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

import { degToRad } from "maath/misc";
import React from "react";
import { MathUtils } from "three";

import { ConversationState, Vector } from "@/app/chatrpi/types";

import { ControlsRig, SvgMesh } from ".";

import { useRingState } from "../hooks";


interface Props {
    conversationState: ConversationState;
}

export function Rings(props: Props) {
    const { conversationState } = props;

    const ringState = useRingState();
    const singleRingStyles = ringState("single", conversationState);
    const doubleRingStyles = ringState("double", conversationState);
    const tripleRingStyles = ringState("triple", conversationState);
    const quadRingStyles = ringState("quad", conversationState);

    const rotation: Vector = [
        MathUtils.degToRad(-60),
        MathUtils.degToRad(45),
        MathUtils.degToRad(0),
    ];

    return (
        <group
            position={ [ -15, 0, 0 ] }
            rotation={ [ -degToRad(10), 0, 0 ] }>
            <ControlsRig>
                <SvgMesh
                    scale={ 0.35 }
                    width={ 0.5 }
                    rotation={ rotation }
                    variant="single-ring"
                    { ...singleRingStyles }
                />
                <SvgMesh
                    scale={ 1 }
                    width={ 0.5 }
                    rotation={ rotation }
                    variant="dual-ring"
                    { ...doubleRingStyles }
                />
                <SvgMesh
                    scale={ 1.5 }
                    width={ 0.5 }
                    rotation={ rotation }
                    variant="triple-ring"
                    { ...tripleRingStyles }
                />
                <SvgMesh
                    scale={ 2 }
                    width={ 0.5 }
                    rotation={ rotation }
                    variant="quad-ring"
                    { ...quadRingStyles }
                />
            </ControlsRig>
        </group>
    );
}
