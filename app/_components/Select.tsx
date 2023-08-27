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
import { ChangeEvent, useCallback, useMemo } from "react";


export type SelectOption = { name: string, value: string };

interface Props {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function Select(props: Props) {
    const {
        options,
        value,
        onChange,
        className
    } = props;

    const optionElements = useMemo(() => {
        return options.map(({ name, value }) => {
            return (
                <option
                    key={ value }
                    value={ value }>
                    { name }
                </option>
            );
        });
    }, [ options ]);

    const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    }, [ onChange ]);

    return (
        <div className={ clsx("inline-block relative w-64", className) }>
            <select
                className="block appearance-none w-full
                           font-body text-gray-100
                           bg-transparent border border-teal-400
                           px-4 py-2 pr-8 rounded
                           cursor-pointer
                           hover:bg-teal-800 active:border-teal-500
                           focus:outline-none focus:ring-1 focus:ring-teal-400 focus:ring-offset-background"
                value={ value }
                onChange={ handleChange }>
                { optionElements }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
}
