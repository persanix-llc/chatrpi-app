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

import { useCallback, useEffect, useState } from "react";

import { LOCAL_STORAGE_DEFAULTS } from "@/app/constants";
import { LocalStorageKey } from "@/app/types";


type UseLocalStorage<T> = [ item: T, setItem: (item: T) => void ];

export function useLocalStorage<T>(key: LocalStorageKey): UseLocalStorage<T> {
    const defaultValue = LOCAL_STORAGE_DEFAULTS[key] as T;

    const [ item, setItem ] = useState<T>(defaultValue);
    const [ loaded, setLoaded ] = useState<boolean>(false);

    const set = useCallback((item: T) => {
        setItem(item);
    }, []);

    useEffect(() => {
        try {
            const json = window.localStorage.getItem(key);
            if (json) {
                const item = JSON.parse(json);
                setItem(item);
            }
        } catch (error) {
            console.error(`Failed to fetch item '${ key }' from storage`, error);
        }
        setLoaded(true);
    }, [ key ]);

    useEffect(() => {
        try {
            const json = JSON.stringify(item);
            window.localStorage.setItem(key, json);
        } catch (error) {
            console.error(`Failed to store item '${ key }'`, error);
        }
    }, [ item, key ]);

    useEffect(() => {
        if (loaded && item === defaultValue) {
            set(defaultValue);
        }
    }, [ defaultValue, item, key, loaded, set ]);

    return [ item, set ];
}
