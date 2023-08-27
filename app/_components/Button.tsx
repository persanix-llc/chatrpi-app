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

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type BaseProps = PropsWithChildren<{
    size?: Size;
    variant?: Variant;
    enabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    className?: string;
}>;

interface ToProps extends BaseProps {
    to?: string;
}

interface OnClickProps extends BaseProps {
    onClick?: () => void;
}

type Props = ToProps | OnClickProps;

type Variant = "primary" | "secondary" | "destructive";
const VariantStylesMap: Record<Variant, string> = {
    "primary": clsx(
        "border-teal-600 text-teal-500",
        "hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 hover:ring-offset-background",
        "focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-background",
        "active:bg-teal-950",
    ),
    "secondary": clsx(
        "border-gray-200 text-gray-200",
        "hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 hover:ring-offset-background",
        "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-background",
        "active:bg-teal-950",
    ),
    "destructive": clsx(
        "border-red-600 text-red-500",
        "hover:ring-2 hover:ring-red-600 hover:ring-offset-2 hover:ring-offset-background",
        "focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-background",
        "active:bg-red-950",
    ),
} as const;

type Size = "medium" | "large";
const SizeStyleMap: Record<Size, string> = {
    "medium": "px-6 py-2",
    "large": "px-8 py-4",
} as const;


export function Button(props: Props) {
    const {
        children,
        size = "medium",
        enabled = true,
        loading = false,
        variant = "primary",
        fullWidth = false,
        className
    } = props;
    const router = useRouter();

    function handleOnClick() {
        if (enabled && !loading) {
            if ("to" in props && typeof props.to === "string") {
                router.push(props.to);
            } else if ("onClick" in props && typeof props.onClick === "function") {
                props.onClick();
            }
        }
    }

    const variantStyles = VariantStylesMap[variant];
    const sizeStyles = SizeStyleMap[size];

    return (
        <button
            className={
                clsx("rounded border font-body transition-all",
                    (!enabled || loading) && "bg-gray-800 text-gray-500 border-gray-500 cursor-not-allowed",
                    (enabled && !loading) && variantStyles,
                    sizeStyles,
                    fullWidth && "w-full",
                    className
                ) }
            disabled={ !enabled }
            onClick={ handleOnClick }>
            <span className="font-body">
                { children }
                {
                    loading && (
                        <FontAwesomeIcon
                            className="h-4 w-4 fa-spin ml-2"
                            icon={ faCircleNotch }
                        />
                    )
                }
            </span>
        </button>
    );

}
