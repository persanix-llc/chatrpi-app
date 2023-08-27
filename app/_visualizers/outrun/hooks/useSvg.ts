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

import { useMemo } from "react";

import { Svg, SvgVariant } from "@/app/_visualizers/outrun/types";

import dualRing from "../svg/ring-dual.svg";
import quadRing from "../svg/ring-quad.svg";
import singleRing from "../svg/ring-single.svg";
import tripleRing from "../svg/ring-triple.svg";


/**
 * Returns metadata for an enumerated SVG.
 *
 * @param {SvgVariant} variant
 * @returns {Svg}
 */
export function useSvg(variant: SvgVariant): Svg {
    return useMemo(() => {
        if (variant === "single-ring") {
            return {
                source: singleRing.src,
                height: singleRing.height,
                width: singleRing.width
            };
        } else if (variant === "dual-ring") {
            return {
                source: dualRing.src,
                height: dualRing.height,
                width: dualRing.width
            };
        } else if (variant === "triple-ring") {
            return {
                source: tripleRing.src,
                height: tripleRing.height,
                width: tripleRing.width
            };
        }
        return {
            source: quadRing.src,
            height: quadRing.height,
            width: quadRing.width
        };
    }, [ variant ]);
}
