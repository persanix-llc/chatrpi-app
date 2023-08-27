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
import { PropsWithChildren } from "react";


type Props = PropsWithChildren<{}>;

export function Notification(props: Props) {
    const { children } = props;

    if (!children) {
        return null;
    }

    return (
        <div className={ clsx(
            "fixed right-12 bottom-8",
            "max-w-sm",
            "bg-gray-800 rounded-lg animate-fade-in",
            "border border-teal-500",
            "px-6 py-3",
        ) }>
            <p className="text-gray-100 text-lg font-body">
                { children }
            </p>
        </div>
    );
}
