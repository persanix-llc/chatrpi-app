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

import { animated, config, useSpring } from "@react-spring/three";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { Group, Path, ShapePath, } from "three";
import { SVGLoader } from "three-stdlib";

import { usePrevious } from "@/app/_hooks";
import { ColorHex, Vector } from "@/app/chatrpi/types";

import { useSvg } from "../hooks";
import { SvgVariant } from "../types";


interface Props {
    variant: SvgVariant;
    speed?: number;
    scale?: number;
    width?: number;
    color?: ColorHex;
    position?: Vector;
    rotation?: Vector;
}

export function SvgMesh(props: Props) {
    const {
        variant,
        position = [ 0, 0, 0 ],
        rotation = [ 0, 0, 0 ],
        speed = 1,
        scale = 0.1,
        width = 1,
        color = "#FFFFFF"
    } = props;

    const svg = useSvg(variant);
    const { paths } = useLoader(SVGLoader, svg.source);

    const groupRef = useRef<Group>(null);

    const previousColor = usePrevious(color);
    const { color: colorSpring } = useSpring({
        color: previousColor === color ? previousColor : color
    });

    const previousPosition = usePrevious(position);
    const { position: positionSpring } = useSpring({
        position: previousPosition?.toString() === position.toString() ? previousPosition : position,
        config: config.wobbly
    });

    const previousSpeed = usePrevious(speed);
    const speedRef = useRef(speed);
    // noinspection JSUnusedGlobalSymbols
    useSpring({
        speed: previousSpeed === speed ? previousSpeed : speed,
        onChange: ({ value }) => {
            speedRef.current = value.speed;
        },
        config: config.slow
    });
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += (delta * speedRef.current);
        }
    });

    const { intensity: emissiveSpringIntensity } = useSpring({
        from: { intensity: 1 },
        to: { intensity: 1.5 },
        loop: { reverse: true },
        config: config.slow
    });

    const meshes = useMemo(() => {
        const positionX = -1 * Math.ceil(svg.width / 2);
        const positionY = -1 * Math.ceil(svg.height / 2);

        return paths.flatMap((path: ShapePath, pathIndex: number) => {
            return path.subPaths.map((subPath: Path, subPathIndex: number) => {
                const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), {
                    strokeColor: "transparent",
                    strokeWidth: width / scale,
                    strokeMiterLimit: 0,
                    strokeLineCap: "none",
                    strokeLineJoin: "none"
                });

                return (
                    <mesh
                        key={ `${ pathIndex }-${ subPathIndex }` }
                        geometry={ geometry }
                        position={ [ positionX, positionY, 0 ] }
                    >
                        {/* @ts-ignore Erroneous TS issue: https://github.com/pmndrs/react-spring/issues/1515 */ }
                        <animated.meshStandardMaterial
                            emissive={ colorSpring }
                            emissiveIntensity={ emissiveSpringIntensity }
                            toneMapped={ false }
                        />
                    </mesh>
                );
            });
        });
    }, [ svg, paths, width, scale, colorSpring, emissiveSpringIntensity ]);

    return (
        <animated.group
            ref={ groupRef }
            scale={ scale }
            rotation={ rotation }
            position={ positionSpring }>

            { meshes }
        </animated.group>
    );
}
