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

import { Globals } from "@react-spring/shared";
import { CameraShake, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import clsx from "clsx";

import { GridFloor, Rings } from "@/app/_visualizers/outrun/components";
import { MeteorShower } from "@/app/_visualizers/outrun/components/MeteorShower";
import { ParticleField } from "@/app/_visualizers/outrun/components/ParticleField";
import { ConversationState } from "@/app/chatrpi/types";

// Work-around for react-spring issue: https://github.com/pmndrs/react-spring/issues/1586
Globals.assign({
    frameLoop: "demand",
});


interface Props {
    conversationState: ConversationState;
    className?: string;
}

export function Visualizer(props: Props) {
    const {
        conversationState,
        className
    } = props;

    return (
        <div className={ clsx("overflow-hidden", className) }>
            <Canvas camera={ { position: [ 10, 5, 15 ] } }>
                <ambientLight/>
                <color attach="background" args={ [ "#0a0a0a" ] }/>

                <OrbitControls
                    makeDefault
                    enableZoom={ false }
                    enablePan={ false }
                    enableRotate={ false }
                />

                <Rings conversationState={ conversationState }/>

                <EffectComposer multisampling={ 8 }>
                    <Bloom
                        kernelSize={ 3 }
                        luminanceThreshold={ 0 }
                        luminanceSmoothing={ 0.4 }
                        intensity={ 0.5 }
                    />
                    <Bloom
                        kernelSize={ 4 }
                        luminanceThreshold={ 0 }
                        luminanceSmoothing={ 0 }
                        intensity={ 0.5 }
                    />
                </EffectComposer>

                <CameraShake
                    yawFrequency={ 0.025 }
                    pitchFrequency={ 0.025 }
                    rollFrequency={ 0.025 }
                />

                <ParticleField conversationState={ conversationState }/>
                <MeteorShower conversationState={ conversationState }/>

                <GridFloor
                    positionY={ -11 }
                    rotationX={ 120 }
                />
            </Canvas>
        </div>
    );
}
