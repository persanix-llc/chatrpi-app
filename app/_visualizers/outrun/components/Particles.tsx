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

import { animated, useSpring } from "@react-spring/three";
import { PointMaterial, Points } from "@react-three/drei";
import { onSphere } from "maath/random";
import React, { useMemo } from "react";

import { usePrevious } from "@/app/_hooks";
import { ConversationState } from "@/app/chatrpi/types";

import { useRingState } from "../hooks";
import { Ring } from "../types";


// Typescript couldn't figure out <animated.PointMaterial /> so use animated() directly
const AnimatedPointMaterial = animated(PointMaterial);

interface Props {
    conversationState: ConversationState;
    ring: Ring;
    particles?: number;
    radius?: number;
    size?: number;
}

export function Particles(props: Props) {
    const {
        conversationState,
        ring,
        particles = 500,
        radius = 200,
        size = 1.5
    } = props;

    // Particle count needs to be evenly divisible by 3 for [ x, y, z, x, ..., z ]
    // See: https://stackoverflow.com/questions/75733965/react-threejs-render-problem-computed-radius-is-nan
    const particlesDivisibleByThree = useMemo(() => {
        let divisibleParticles = particles;
        while (divisibleParticles % 3 !== 0) {
            divisibleParticles += 1;
        }
        return divisibleParticles;
    }, [ particles ]);

    const positions = useMemo(() => {
        const particleArray = new Float32Array(particlesDivisibleByThree);
        return onSphere(particleArray, { radius }) as Float32Array;
    }, [ particlesDivisibleByThree, radius ]);

    const ringState = useRingState()(ring, conversationState);

    const previousColor = usePrevious(ringState.color);
    const { color: colorSpring } = useSpring({
        color: previousColor === ringState.color ? previousColor : ringState.color
    });

    return (
        <Points
            positions={ positions }
            stride={ 3 }
            frustumCulled={ false }>
            {/* @ts-ignore Erroneous TS issue: https://github.com/pmndrs/react-spring/issues/1515 */ }
            <AnimatedPointMaterial
                transparent
                color={ colorSpring }
                size={ size }
                sizeAttenuation={ true }
                depthWrite={ false }
            />
        </Points>
    );
}
