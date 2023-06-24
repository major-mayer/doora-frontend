# Doora Fronend
This repositoy contains the source code for the Doora companion app for Android and iOS.
## Prerequisites
- NPM 
- Node.js
- Android Studio and/ or Xcode, depending on the target platform
## Installing dependencies
Download and install Ionic, Capacitor, Vue, and all the other dependencies using NPM. 
```bash
npm install # (--dev)
```

## Run (in a browser)
Run a development server and open using the default browser:
```bash
npx ionic serve
```

## Build
Builds the web project, copies it to native platforms and updates native plugins and dependencies:
```bash
npx ionic build && npx cap copy
npx cap sync --inline
```

## Open in native IDE
Open Android Studio (adjust path to your needs): 
```bash
CAPACITOR_ANDROID_STUDIO_PATH=/usr/bin/android-studio npx cap open android                                                                                                               
```

Open Xcode: 
```bash
npx cap open ios                                                                                                               
```

After this step you can use the build command of Android Studio / Xcode to build the native app and generate packages.

## Misc


Re-generate OpenAPI client (assuming the backend is running locally):
```bash
npx openapi -i http://localhost:8080/v3/api-docs -o src/doora-api-client
```