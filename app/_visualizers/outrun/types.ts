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

export type Ring = "single" | "double" | "triple" | "quad";

export type Vector = [
    x: number,
    y: number,
    z: number
];

export interface Svg {
    source: string;
    height: number;
    width: number;
}

export type SvgVariant = "single-ring" | "dual-ring" | "triple-ring" | "quad-ring";
