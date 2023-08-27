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

import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";
import { MathUtils } from "three";

import { EMERALD, TEAL } from "@/app/_visualizers/outrun/constants";
import { Vector } from "@/app/_visualizers/outrun/types";


interface Props {
    positionY: number;
    rotationX: number;
}

export function GridFloor(props: Props) {
    const { positionY, rotationX } = props;

    const gridRotation: Vector = [ 0, MathUtils.degToRad(rotationX), 0 ];
    const reflectorRotation: Vector = [ -MathUtils.degToRad(90), 0, MathUtils.degToRad(rotationX) ];
    return (
        <group>
            <gridHelper
                args={ [ 200, 8, TEAL, TEAL ] }
                rotation={ gridRotation }
                position-y={ positionY + 0.2 }
                position-z={ 0 }
            />
            <gridHelper
                args={ [ 200, 48, EMERALD, EMERALD ] }
                rotation={ gridRotation }
                position-y={ positionY + 0.1 }
                position-z={ 0 }
            />
            <mesh
                scale={ [ 200, 200, 200 ] }
                rotation={ reflectorRotation }
                position-y={ positionY }>
                <planeGeometry/>
                <MeshReflectorMaterial
                    blur={ [ 500, 500 ] }
                    mixBlur={ 1 }
                    mixStrength={ 0.5 }
                    mirror={ 1 }
                />
            </mesh>
        </group>
    );
}
