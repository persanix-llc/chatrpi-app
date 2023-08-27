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

import { faGear } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React from "react";

import { Banner, Button, ExternalLink, IconButton } from "@/app/_components";
import { LoadingStep } from "@/app/chatrpi/types";
import { VERSION } from "@/app/constants";
import { Logo } from "@/app/Logo";
import { Path } from "@/app/types";


interface Props {
    loadingStep: LoadingStep;
    error?: string;
    onStart: () => void;
}

export function Initialization(props: Props) {
    const { loadingStep, error, onStart } = props;
    const isLoading = loadingStep !== "Begin";
    return (
        <div className="px-12 py-6 h-screen">
            <Logo className="max-w-[15rem]"/>
            <div className="flex flex-col items-center pt-32">
                <div className="w-full max-w-lg space-y-12">
                    <h1 className="text-5xl font-heading font-light text-gray-100
                               animate-fade-in-1 opacity-0 fill-mode-forwards">
                        Hello.
                    </h1>
                    <p className="text-xl font-body text-gray-100
                                  animate-fade-in-3 opacity-0 fill-mode-forwards">
                        It&apos;s good to see you again.
                    </p>
                    <div className="animate-fade-in-5 opacity-0 fill-mode-forwards">
                        <p className="text-lg font-body text-gray-100">
                            Shall we begin?
                        </p>
                        <Button
                            className="mt-4"
                            loading={ !error && isLoading }
                            onClick={ onStart }
                            fullWidth>
                            { (!error && isLoading) ? loadingStep : "Begin" }
                        </Button>
                    </div>

                    <Banner
                        className={ clsx("mt-5 min-h-[4rem]", error ? "visible animate-fade-in" : "invisible") }
                        variant="error">
                        { error } Please review Chatrpi&apos;s settings.
                    </Banner>
                </div>
                <div className="absolute left-8 bottom-8">
                    <IconButton
                        icon={ faGear }
                        to={ Path.Settings }
                    />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-8 space-y-2
                                animate-fade-in-7 opacity-0 fill-mode-forwards">
                    <p className="text-center font-body text-gray-100">
                        Made by <ExternalLink to="https://persanix.com">Persanix</ExternalLink>
                    </p>
                    <p className="text-sm text-center font-body text-gray-100">
                        Version { VERSION }
                    </p>
                </div>
                <div className="absolute right-8 bottom-8
                                animate-fade-in-8 opacity-0 fill-mode-forwards">
                    <a
                        className="text-base text-end font-body text-teal-500 underline"
                        href={ Path.Sandboxes }>
                        Sandboxes
                    </a>
                </div>
            </div>
        </div>
    );
}
