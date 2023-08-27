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

type Props = PropsWithChildren<{
    to: string
    className?: string
}>;

export function ExternalLink(props: Props) {
    const {
        to,
        children,
        className
    } = props;

    return (
        <a
            className={ clsx(
                "text-teal-500 underline underline-offset-2 p-0.5",
                "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:rounded",
                className
            ) }
            href={ to }
            target="_blank"
        >
            { children }
        </a>
    );
}
