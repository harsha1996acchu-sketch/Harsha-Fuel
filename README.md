# Harsha Fuel

Vegetarian meal planner and food tracker with pantry suggestions, South Indian recipes, and a simple local food coach.

## Run locally

Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Android installation

When hosted over HTTPS, open the app in Chrome and select Install app or Add to Home screen. The manifest and service worker provide an offline app shell after the first visit.

## Data and limitations

Meal selections, pantry, custom ingredients, and chat stay in browser local storage. There is no account sync or remote AI connection. The coach uses local rules. Nutrition values are estimates and the default targets are placeholders, not medical advice.

## Files

- index.html: interface and logic
- manifest.webmanifest: app installation metadata
- sw.js: offline cache
- icon.svg: app icon
