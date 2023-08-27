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

import { useContext } from "react";

import { Banner, Input } from "@/app/_components";
import { SettingsContext } from "@/app/settings/_context";


export function Name() {
    const { name, setName } = useContext(SettingsContext);

    return (
        <div className="space-y-3">
            <p className="text-gray-100 font-body text-xl">
                Name
            </p>
            <p className="text-gray-100 font-body text-sm">
                The text representation of Chatrpi&apos;s name.
                This <strong>does not</strong> affect the spoken wake word, you should update the name samples if you
                change this name.
            </p>
            <Banner variant="tip">
                Keep the name as short as possible. One or two syllable names work best.
            </Banner>
            <Input
                label="Name"
                type="text"
                value={ name }
                onChange={ setName }
            />
        </div>
    );
}
