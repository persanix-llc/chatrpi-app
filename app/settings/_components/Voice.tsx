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

import React, { useMemo } from "react";

import { Button, Loader, Select } from "@/app/_components";
import { SelectOption } from "@/app/_components/Select";
import { useSelectVoice } from "@/app/_hooks";


export function Voice() {
    const [
        voicesLoaded,
        voices,
        selectedVoiceUri,
        selectVoiceUri,
        sampleSelectedVoice,
        samplingVoice
    ] = useSelectVoice();

    const selectOptions: SelectOption[] = useMemo(() => {
        return voices.map(voice => {
            return { name: voice.name, value: voice.voiceURI };
        });
    }, [ voices ]);
    const selectElement = useMemo(() => {
        if (!voicesLoaded) {
            return <Loader text="Loading voices"/>;
        }

        return (
            <div className="grid grid-cols-3 gap-4 w-full">
                <Select
                    className="col-span-2 w-full"
                    options={ selectOptions }
                    value={ selectedVoiceUri }
                    onChange={ selectVoiceUri }
                />
                <Button
                    variant="secondary"
                    loading={ samplingVoice }
                    fullWidth
                    onClick={ sampleSelectedVoice }>
                    { samplingVoice ? "Sampling..." : "Sample" }
                </Button>
            </div>
        );
    }, [
        sampleSelectedVoice,
        samplingVoice,
        selectOptions,
        selectVoiceUri,
        selectedVoiceUri,
        voicesLoaded
    ]);

    return (
        <div className="space-y-3">
            <p className="text-gray-100 font-body text-xl">
                Voice
            </p>
            <p className="text-gray-100 font-body text-sm">
                The text representation of Chatrpi&apos;s name.
                This <strong>does not</strong> affect the spoken wake word, you should update the name samples if you
                change this name.
            </p>
            { selectElement }
        </div>
    );
}
