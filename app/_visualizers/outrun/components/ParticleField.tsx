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
import React, { useMemo, useRef } from "react";
import { Group } from "three";

import { RINGS } from "@/app/_visualizers/outrun/constants";
import { Ring } from "@/app/_visualizers/outrun/types";
import { ConversationState } from "@/app/chatrpi/types";

import { Particles } from ".";


interface Props {
    conversationState: ConversationState;
    particles?: number;
    innerRadius?: number;
    outerRadius?: number;
    size?: number;
}

export function ParticleField(props: Props) {
    const {
        conversationState,
        particles = 3000,
        innerRadius = 150,
        outerRadius = 700,
        size = 1.5
    } = props;

    const fieldGroupRef = useRef<Group>(null);

    useFrame((_, delta) => {
        if (fieldGroupRef.current) {
            fieldGroupRef.current.rotation.x -= delta / 50;
            fieldGroupRef.current.rotation.z -= delta / 50;
        }
    });

    const particleElements = useMemo(() => {
        const particleGroupSize = Math.ceil(particles / 4);
        const radiusOffset = Math.ceil(Math.abs(outerRadius - innerRadius) / 4);

        // Each set of particles is tied to a specific visualizer ring
        return RINGS.map((ring: Ring, index: number) => {
            const radius = innerRadius + (radiusOffset * index);
            return (
                <Particles
                    key={ ring }
                    particles={ particleGroupSize }
                    conversationState={ conversationState }
                    ring={ ring }
                    radius={ radius }
                    size={ size }
                />
            );
        });
    }, [ conversationState, innerRadius, outerRadius, particles, size ]);

    return (
        <group ref={ fieldGroupRef }>
            { particleElements }
        </group>
    );
}
