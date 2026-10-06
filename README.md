# Angular Deadline Countdown

A simple Angular app that fetches the remaining seconds from `/api/deadline` and displays a countdown:

```text
Seconds left to deadline: 285
```

## Performance choices and tradeoffs

- Since the deadline never changes, only one API request is made per component instance. This avoids polling. The countdown starts from the time the server response is received.
- `OnPush` lets Angular skip this deadline component when it has no updates. The timer runs outside Angular's zone and re-enters only when there's some changes, avoiding unnecessary checks.
- Each tick recalculates the remaining time from a fixed timestamp instead of subtracting one. Delayed callbacks may briefly leave the display outdated, but the next tick recalculates the correct remaining time instead of accumulating the delay. 
- A one-second interval meets the display requirement with O(1) work per tick and O(1) space. Browser scheduling can delay updates.
- The interval stops at zero or component destruction. `takeUntilDestroyed` also cancels a pending HTTP request when the component is removed.

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
