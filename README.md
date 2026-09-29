# Angular Deadline Countdown

A simple Angular app that fetches the remaining seconds from `/api/deadline` and displays a countdown:

```text
Seconds left to deadline: 285
```

The app updates every second, stops at zero, and cleans up the timer when the component is removed. It uses signals and OnPush change detection, and calculates time remaining instead of subtracting one on each tick.

## Requirements

- Node.js 24.15.0 or newer within version 24, with npm.

## Run the app

### 1. Install dependencies

From the repository folder:

```bash
cd deadline-app
npm ci
```

### 2. Start the mock API

In the same terminal:

```bash
node mock-server.mjs
```

Leave it running. The mock API starts a five-minute countdown. Restarting it resets the deadline; refreshing the browser does not.

### 3. Start Angular

Open a second terminal in the repository folder:

```bash
cd deadline-app
npm start -- --proxy-config proxy.conf.json
```

Open [http://localhost:4200](http://localhost:4200) to see the countdown.

Keep both terminals running. The proxy connects Angular to the mock API on port 3000. If you see “Unable to load the deadline,” check that the mock API is running and that you started Angular with the command above.

Press `Ctrl+C` in each terminal to stop the app and API.

## Main files

- `deadline-app/src/app/deadline/deadline.component.ts` — countdown component.
- `deadline-app/mock-server.mjs` — local API returning `{ secondsLeft: number }`.
- `deadline-app/proxy.conf.json` — forwards API requests to the mock server.

## Build

From the `deadline-app` folder:

```bash
npm run build
```

The output is saved under `deadline-app/dist/`.
