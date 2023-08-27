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

interface Props {
    text?: string;
    className?: string;
}

export function Loader(props: Props) {
    const {
        text = "Loading",
        className
    } = props;

    return (
        <div className={ clsx("w-full px-6 py-2",
            "flex flex-col items-center",
            "bg-gray-700 rounded",
            "animate-pulse",
            className
        ) }>
            <span className="font-body text-gray-100">{ text }</span>
        </div>
    );
}
