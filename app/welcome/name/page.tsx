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

import React from "react";

import { Banner, Button } from "@/app/_components";
import { Input } from "@/app/_components/Input";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { LocalStorageKey, Path } from "@/app/types";


export default function Name() {
    const [ name, setName ] = useLocalStorage<string>(LocalStorageKey.Name);
    const continueEnabled = name.length > 0 && name.length <= 25;
    return (
        <>
            <h1 className="text-5xl font-heading font-light text-gray-100
                           animate-fade-in-1 opacity-0 fill-mode-forwards">
                First, I need a name.
            </h1>
            <p className="text-xl font-body text-gray-100
                          animate-fade-in-3 opacity-0 fill-mode-forwards">
                The name you give me will be used as a wake word which is a
                word you say out loud to get my attention.
            </p>
            <p className="text-lg font-body text-gray-100
                          animate-fade-in-5 opacity-0 fill-mode-forwards">
                Keep it short and simple for the best accuracy.
            </p>
            <div className="animate-fade-in-5 opacity-0 fill-mode-forwards">
                <p className="text-lg font-body text-gray-100">
                    What would you like to call me?
                </p>
                <Input
                    className="mt-2"
                    label="Name"
                    value={ name }
                    max={ 25 }
                    onChange={ setName }
                />
            </div>
            <Button
                className="animate-fade-in-6 opacity-0 fill-mode-forwards"
                to={ Path.WelcomeMicrophoneAccess }
                fullWidth
                enabled={ continueEnabled }>
                Continue
            </Button>
            <Banner className="animate-fade-in-6 opacity-0 fill-mode-forwards" variant="info">
                You can change my name after completing the setup in the settings page.
            </Banner>
        </>
    );
}
