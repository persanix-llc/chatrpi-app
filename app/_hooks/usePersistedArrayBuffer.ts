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

import { openDB } from "idb";
import { useCallback, useEffect, useState } from "react";

import { INDEXED_DB_ARRAY_BUFFER_STORE, INDEXED_DB_NAME, INDEXED_DB_VERSION } from "@/app/constants";
import { IndexedDBKey } from "@/app/types";


type UsePersistedArrayBuffer = [
    arrayBuffer: ArrayBuffer | undefined,
    loaded: boolean,
    set: (item: ArrayBuffer) => void,
    clear: () => void
];

export function usePersistedArrayBuffer(key: IndexedDBKey): UsePersistedArrayBuffer {
    const [
        arrayBuffer,
        setArrayBuffer
    ] = useState<ArrayBuffer | undefined>(undefined);

    const [ loaded, setLoaded ] = useState(false);

    const set = useCallback(async (item: ArrayBuffer) => {
        try {
            const idb = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
                upgrade(db) {
                    db.createObjectStore(INDEXED_DB_ARRAY_BUFFER_STORE);
                }
            });
            await idb.put(INDEXED_DB_ARRAY_BUFFER_STORE, item, key);
            setArrayBuffer(item);
        } catch (error) {
            console.error(`Failed to store item '${ key }'`, error);
        }
    }, [ key ]);

    const clear = useCallback(async () => {
        try {
            const idb = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
                upgrade(db) {
                    db.createObjectStore(INDEXED_DB_ARRAY_BUFFER_STORE);
                }
            });
            await idb.delete(INDEXED_DB_ARRAY_BUFFER_STORE, key);
            setArrayBuffer(undefined);
        } catch (error) {
            console.error(`Failed to clear item '${ key }'`, error);
        }
    }, [ key ]);

    useEffect(() => {
        (async () => {
            const idb = await openDB(INDEXED_DB_NAME, INDEXED_DB_VERSION, {
                upgrade(db) {
                    db.createObjectStore(INDEXED_DB_ARRAY_BUFFER_STORE);
                }
            });
            const value: ArrayBuffer | undefined = await idb.get(INDEXED_DB_ARRAY_BUFFER_STORE, key);
            if (value) {
                await set(value);
            }
            setLoaded(true);
        })();
    }, [ key, set ]);

    return [
        arrayBuffer,
        loaded,
        set,
        clear
    ];
}
