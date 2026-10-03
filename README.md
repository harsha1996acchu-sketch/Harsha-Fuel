# Harsha Fuel

Vegetarian meal planner and food tracker with pantry suggestions, South Indian recipes, and a simple local food coach.

## Run locally

Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Android installation

When hosted over HTTPS, open the app in Chrome and select Install app or Add to Home screen. The manifest and service worker provide an offline app shell after the first visit.

## Data and limitations

Meal selections, pantry, custom ingredients, and chat stay in browser local storage. There is no account sync or remote AI connection. Basic Coach uses local rules; optional Gemma generates replies on the device. Nutrition values are estimates and the default targets are placeholders, not medical advice.

## Files

- index.html: interface and logic
- manifest.webmanifest: app installation metadata
- sw.js: offline cache
- icon.svg: app icon

## Offline Gemma Coach

1. Open the hosted app in Chrome over HTTPS. Reload once if the app asks to activate its offline cache.
2. In Settings → On-device AI, press **Download AI engine** while connected.
3. Visit https://huggingface.co/litert-community/Gemma3-1B-IT/blob/main/gemma3-1b-it-int4-web.task and download exactly `gemma3-1b-it-int4-web.task` (the model card lists about 700 MB). Hugging Face may require sign-in and acceptance of Google's Gemma terms.
4. Select that file in Settings and press **Start Gemma**. The file is read locally, never uploaded.
5. Optionally press **Save model on phone**. On later visits, press **Use saved model**. Keep the original download as a backup: browser storage can be evicted or cleared.
6. Once a local reply works, test again in airplane mode using typed input. Browser speech recognition can use network services.

Requires WebGPU and enough free memory/storage. The model runs through Chrome; the optional Android APK launches this browser integration. Device performance and real model inference need validation on the target phone. Loading may take time. If local AI fails, its status explains the problem; Basic Coach remains explicitly selectable.

The engine is MediaPipe tasks-genai 0.10.27. Its JavaScript bundle is vendored; selected WASM assets download from the pinned jsDelivr package and are cached on the first setup. Clearing site storage removes these assets. Prompt context includes current meals, pantry and estimated totals, with a 500-character question limit; the last four chat messages are supplied when they fit within the token budget.

## Third-party notices

`genai_bundle.mjs` is from `@mediapipe/tasks-genai` 0.10.27, Copyright the MediaPipe Authors, Apache License 2.0. See `MEDIAPIPE-LICENSE.txt`. Gemma model weights are not distributed with this repository and remain subject to their own terms.

## v5 interface

Food photo cards, portion controls, search, a dedicated large Coach conversation, and a Settings tab. Settings stores adjustable calorie/protein/fiber targets, egg/dairy preferences, ingredients to avoid, light/dark theme, device voice, reading speed, and automatic speech. Custom groceries support optional compressed local photos; both calories and protein per 100 g are required to log them on the plate. Other custom nutrients are untracked. Existing hf3 browser data and saved model storage are retained. Export/restore provides manual app-data backups; model weights are separate. Clear plate, remove grocery, and clear chat offer an Undo action.

Photos are illustrative Wikimedia Commons photographs, credited in Settings and photo-data.js. Bundled photos are served from this repository and cached for offline use; no third-party image requests occur in the app. Some dish variations share an illustrative photo.

## Android APK and personal photos (v6)

Harsha-Fuel-1.0.apk is a signed Chrome Custom Tabs Android package (com.harsha.fuel, Android 8+). It launches the HTTPS app using installed Chrome, retains the origin’s existing browser data and offline Gemma capability, and may display Chrome’s toolbar. It is not a standalone native inference engine; Chrome and the separate Gemma model remain required. First use requires a network connection; the website caches the app shell and images for later offline use. The APK itself requests no file, camera, microphone or network permissions. Image picking is handled by Chrome after user interaction. Native Android source and a command-line build script are in Harsha-Fuel-Android-source.zip; signing credentials are intentionally excluded from the repository.

Every food card has Edit photo, including existing preset foods. Settings supports the same action for custom groceries without nutrition. Selected pictures are compressed locally to JPEG and included in app-data backups. Restore original removes the personal override and offers Undo. Motion settings support smooth or reduced transitions; system reduced-motion preferences are always honored. Streaming replies update their existing message nodes to avoid repeated entrance animations.
