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

import { Input } from "@/app/_components";
import { useLocalStorage } from "@/app/_hooks";
import { LocalStorageKey } from "@/app/types";


export function RecognitionProbabilityThreshold() {
    const [
        recognitionProbabilityThreshold,
        setRecognitionProbabilityThreshold
    ] = useLocalStorage(LocalStorageKey.RecognitionProbabilityThreshold);

    return (
        <div className="space-y-3">
            <p className="text-gray-100 font-body text-xl">
                Recognition probability threshold
            </p>
            <p className="text-gray-100 font-body text-sm">
                The minimum probability Chatrpi uses to detect its wake word.
                A value of 0.9 means Chatrpi will only wake if it&apos;s 90% sure it heard its name.
            </p>
            <Input
                label="Recognition probability threshold"
                type="number"
                value={ recognitionProbabilityThreshold }
                onChange={ setRecognitionProbabilityThreshold }
                min={ 0 }
                max={ 1 }
                step={ 0.01 }
            />
        </div>
    );
}
