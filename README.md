# Angular Deadline Countdown

A simple Angular app that fetches the remaining seconds from `/api/deadline` and displays a countdown:

```text
Seconds left to deadline: 285
```

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

The mock API starts a five-minute countdown.

### 3. Start Angular

Open a second terminal in the repository folder:

```bash
cd deadline-app
npm start -- --proxy-config proxy.conf.json
```

Open [http://localhost:4200](http://localhost:4200) to see the countdown.
