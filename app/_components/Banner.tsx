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

import { faFireFlameCurved, faInfo, faTimes, faWarning, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { PropsWithChildren } from "react";


type Variant = "tip" | "error" | "info" | "warning";

const VariantStylesMap: Record<Variant, string> = {
    "tip": clsx(
        "border-teal-600 text-teal-500",
    ),
    "error": clsx(
        "border-red-600 text-red-500",
    ),
    "info": clsx(
        "border-blue-400 text-blue-400",
    ),
    "warning": clsx(
        "border-yellow-400 text-yellow-400",
    ),
} as const;
const VariantIconMap: Record<Variant, IconDefinition> = {
    "tip": faFireFlameCurved,
    "error": faTimes,
    "info": faInfo,
    "warning": faWarning
} as const;


type Props = PropsWithChildren<{
    variant: Variant
    className?: string
}>;

export function Banner(props: Props) {
    const {
        variant,
        children,
        className
    } = props;

    if (!children) {
        return null;
    }

    const variantIcon = VariantIconMap[variant];
    const variantStyles = VariantStylesMap[variant];

    return (
        <div className={ clsx("w-full px-4 py-2",
            "flex flex-col space-y-1",
            "border rounded-lg",
            variantStyles,
            className
        ) }>
            <span className="flex items-center gap-x-1.5
                             font-heading font-bold text-sm">
                <FontAwesomeIcon
                    className="!h-4 !w-4"
                    icon={ variantIcon }
                />
                { variant.toUpperCase() }
            </span>
            <span className="font-body text-sm block">
                { children }
            </span>
        </div>
    );
}
