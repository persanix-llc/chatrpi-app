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

import { useFrame, useThree } from "@react-three/fiber";
import React, { PropsWithChildren, useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";


export function ControlsRig(props: PropsWithChildren<{}>) {
    const { children } = props;

    const groupRef = useRef<Group>(null);
    const { mouse } = useThree();

    useFrame(() => {
        if (groupRef.current) {
            const positionLerp = new Vector3(mouse.x * 0.5, mouse.y * -0.5, 0);
            groupRef.current.position.lerp(positionLerp, 0.1);

            const rotationY = groupRef.current.rotation.y;
            // noinspection JSSuspiciousNameCombination
            groupRef.current.rotation.y = MathUtils.lerp(rotationY, (mouse.x * Math.PI) / 20, 0.1);
            // noinspection JSSuspiciousNameCombination
            groupRef.current.rotation.z = MathUtils.lerp(rotationY, (mouse.y * Math.PI) / 20, 0.1);
        }
    });

    return (
        <group ref={ groupRef }>
            { children }
        </group>
    );
}
