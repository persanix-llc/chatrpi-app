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

import clsx from "clsx";
import { ChangeEvent } from "react";


interface Props {
    label: string;
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    autoFocus?: boolean;
    type?: "text" | "number";
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export function Input(props: Props) {
    const {
        label,
        value,
        onChange,
        placeholder,
        autoFocus,
        type = "text",
        min,
        max,
        step,
        className
    } = props;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        if (type === "number") {
            onChange(Number(value));
        } else {
            onChange(value);
        }
    }

    return (
        <div
            className={ clsx(
                "flex items-center border-b border-teal-500 py-2",
                className
            ) }>
            <input
                className="appearance-none bg-transparent border-none w-full text-gray-100 text-lg mr-3 py-1 px-2 leading-tight focus:outline-none"
                type={ type }
                autoFocus={ autoFocus }
                value={ value }
                onChange={ handleChange }
                min={ type === "number" ? min : undefined }
                minLength={ type === "text" ? min : undefined }
                max={ type === "number" ? max : undefined }
                maxLength={ type === "text" ? max : undefined }
                placeholder={ placeholder }
                aria-label={ label }
                step={ step }
            />
        </div>
    );
}
