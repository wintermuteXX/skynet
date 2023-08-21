# AutoScreep Starter Bot

This is a fork from AutoScreep Starter Bot. Lets call him Skynet, because I have very limited sense of humor.

## Features

### Task Managers

Task Managers are essential for prioritizing tasks and managing Creep roles efficiently.

The Core Manager serves as the system's entry point, running other managers using a CPU-based priority system. This prioritization system ensures that critical tasks, such as operating Spawns and Towers, are executed first, and it can automatically skip lower priority tasks when the CPU bucket is running low.

### Spawn Manager

The Spawn Manager processes orders to spawn creeps from a priority-based queue.

### Operations

Operations allow you to create autonomous missions that focus on achieving specific goals.

### Services

Creep and Room Services provide task managers with efficient access to query for creeps and rooms.

### Prototypes

Prototypes allow you to expand the capabilities of regular Game objects with extra behaviors or optimizations.

### Rollup and Code Upload

AutoScreep Starter Bot utilizes Rollup to compile your TypeScript code and upload it to a Screeps server.

The `package.json` includes NPM scripts that serve as aliases for the Rollup commands. For example, running `npm run push-main` will build and push using the "main" destination in your `screeps.json` file.

Note: For uploading code to a private server, you must have [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) installed and configured.

## Credits

This bot is heavily inspired by the public release of KasamiBot, and we extend our gratitude to Kasami for generously sharing their work!
