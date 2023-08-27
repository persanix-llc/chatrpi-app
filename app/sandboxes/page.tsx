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

"use client";

import { faGear } from "@fortawesome/free-solid-svg-icons";

import { Button, IconButton } from "@/app/_components";
import { Logo } from "@/app/Logo";

import { Path } from "../types";


export default function Sandboxes() {
    return (
        <div className="px-12 py-6 bg-gray-950 h-screen">
            <Logo className="max-w-[15rem]"/>
            <div className="flex flex-col items-center py-12">
                <h1 className="text-5xl font-heading font-light text-center text-gray-100">
                    Sandboxes
                </h1>
                <p className="mt-6 text-xl font-body text-gray-100">
                    A space to experiment, play, and break things.
                </p>
                <div className="mt-24 w-full max-w-lg">
                    <Button to={ Path.SandboxesOutrunVisualizer } fullWidth>
                        Outrun visualizer
                    </Button>
                </div>
            </div>
            <div className="absolute left-8 bottom-8">
                <IconButton
                    icon={ faGear }
                    to={ Path.Settings }
                />
            </div>
        </div>
    );
}
