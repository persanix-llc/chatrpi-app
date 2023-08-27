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

import { useFrame } from "@react-three/fiber";
import { degToRad } from "maath/misc";
import React, { useMemo, useRef, useState } from "react";
import { Mesh, MeshStandardMaterial } from "three";

import { usePrevious } from "@/app/_hooks";
import { ConversationState } from "@/app/chatrpi/types";

import { useRingState } from "../hooks";
import { Ring } from "../types";


interface Props {
    conversationState: ConversationState;
    ring: Ring;
    from?: number;
    to?: number;
    maxAngle?: number;
    length?: number;
    speed?: number;
}

export function Meteor(props: Props) {
    const {
        conversationState,
        ring,
        from = 50,
        to = -500,
        maxAngle = 45,
        length = 100,
        speed = 3
    } = props;

    const meshRef = useRef<Mesh>(null);

    const [ randomRotation, setRandomRotation ] = useState(generateRandomRotation());
    const previousRotation = usePrevious(randomRotation);

    const ringState = useRingState();
    const [ color, setColor ] = useState(() => {
        return ringState(ring, conversationState).color;
    });

    const stochasticFrom = useMemo(() => from + (from * Math.random()), [ from ]);
    const stochasticTo = useMemo(() => -Math.abs(to + (to * Math.random())), [ to ]);
    const stochasticLength = useMemo(() => length + ((length / 2) * Math.random()), [ length ]);
    const stochasticSpeed = useMemo(() => speed + (speed * Math.random()), [ speed ]);

    useFrame(() => {
        if (meshRef.current) {
            const mesh: Mesh = meshRef.current;
            const material = mesh.material as MeshStandardMaterial;

            if (previousRotation === randomRotation) {
                mesh.translateX(-Math.abs(stochasticSpeed));

                // Fade out completely at 75% of the total travel
                const stochasticToWithBuffer = stochasticTo - (stochasticTo * 0.25);
                const inversePercentageComplete = 1 - Math.abs(mesh.position.x / stochasticToWithBuffer);
                material.opacity = Math.max(inversePercentageComplete, 0);
            }

            if (mesh.position.x < stochasticTo) {
                mesh.position.x = stochasticFrom;
                mesh.position.y = stochasticFrom;
                mesh.visible = Math.random() < getShowChance();
                setRandomRotation(() => generateRandomRotation());
                setColor(ringState(ring, conversationState).color);
            }
        }
    });

    function generateRandomRotation() {
        return degToRad(Math.random() * maxAngle);
    }

    function getShowChance() {
        switch (ring) {
            case "single":
                return 0.1;
            case "double":
                return 0.2;
            case "triple":
                return 0.3;
            case "quad":
                return 0.4;
            default:
                return 0.2;
        }
    }

    return (
        <mesh
            ref={ meshRef }
            rotation-z={ randomRotation }
            position-x={ stochasticFrom }
            position-y={ stochasticFrom }
            position-z={ -100 }
            visible={ false }>
            <boxGeometry args={ [ stochasticLength, 0.25, 0.25 ] }/>
            <meshStandardMaterial emissive={ color } transparent/>
        </mesh>
    );
}
