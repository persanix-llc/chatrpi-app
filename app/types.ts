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


export enum LocalStorageKey {
    Name = "name",
    Voice = "voice",
    RecognitionProbabilityThreshold = "recognition-probability-threshold",
    WelcomeCompleted = "welcome-completed"
}

export enum IndexedDBKey {
    NameSamples = "name-samples",
    BackgroundSamples = "background-samples",
}

export enum TransferRecognizerSample {
    Name = "name",
    Background = "_background_noise_",
}

export enum Path {
    Chatrpi = "/chatrpi",
    Sandboxes = "/sandboxes",
    SandboxesOutrunVisualizer = "/sandboxes/outrun-visualizer",
    Settings = "/settings",
    Welcome = "/welcome",
    WelcomeName = "/welcome/name",
    WelcomeMicrophoneAccess = "/welcome/microphone-access",
    WelcomeWakeWord = "/welcome/wake-word",
    WelcomeBackgroundNoise = "/welcome/background-noise",
    WelcomeSelectVoice = "/welcome/select-voice",
}
