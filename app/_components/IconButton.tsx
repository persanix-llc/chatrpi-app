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

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/navigation";


interface BaseProps {
    icon: IconProp;
    className?: string;
}

interface ToProps extends BaseProps {
    to?: string;
}

interface OnClickProps extends BaseProps {
    onClick?: () => void;
}

type Props = ToProps | OnClickProps;


export function IconButton(props: Props) {
    const {
        icon,
        className
    } = props;
    const router = useRouter();

    function handleOnClick() {
        if ("to" in props && typeof props.to === "string") {
            router.push(props.to);
        } else if ("onClick" in props && typeof props.onClick === "function") {
            props.onClick();
        }
    }

    return (
        <FontAwesomeIcon
            className={ clsx(
                "!h-8 !w-8 text-gray-100 cursor-pointer rounded-full",
                "hover:ring-2 hover:ring-offset-4 hover:ring-offset-background hover:ring-teal-500",
                "focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-background focus:ring-teal-500",
                "active:text-teal-200",
                className
            ) }
            tabIndex={ 0 }
            onClick={ handleOnClick }
            icon={ icon }
        />
    );
}
