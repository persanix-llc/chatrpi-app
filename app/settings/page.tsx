"use client";

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

import { Logo } from "@/app/Logo";
import {
    BackgroundSamples,
    MicrophoneAccess,
    Name,
    NameSamples,
    RecognitionProbabilityThreshold,
    Voice
} from "@/app/settings/_components";
import { SettingsProvider } from "@/app/settings/_context";


export default function Settings() {
    return (
        <SettingsProvider>
            <div className="px-12 py-6 bg-gray-950 h-screen">
                <Logo className="max-w-[15rem]"/>
                <div className="flex flex-col items-center py-12">
                    <h1 className="text-5xl font-heading font-light text-center text-gray-100">
                        Settings
                    </h1>
                    <p className="mt-6 text-xl font-body text-gray-100">
                        Change core settings to enhance your experience.
                    </p>
                    <div className="my-24 w-full max-w-lg space-y-16">
                        <div className="space-y-16">
                            {/*<p className="text-gray-100 font-body text-2xl">Wake word</p>*/ }
                            <Name/>
                            <NameSamples/>
                            <RecognitionProbabilityThreshold/>
                            <BackgroundSamples/>
                            <Voice/>
                            <MicrophoneAccess/>
                        </div>

                    </div>

                </div>
            </div>
        </SettingsProvider>
    );
}
