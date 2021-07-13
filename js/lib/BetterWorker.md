# BetterWorker

Wrapper for browsers `postMessage` API for communicating with other entities.

### How to

```javascript
// client.js

import { ClientScope } from 'BetterWorker';
const client = new ClientScope('worker.js', { type: 'module' });

// emit event with payload to worker. Returns a promise so wait on that or subscribe
client.emit('ping', { foo: 'bar' });

// you can subscribe from multiple places for the event ocurances
client.subscribe('ping', (result) => {
  console.log(result); // 'pong'
});

// emit is actually a promise, so you can wait until your event handler is done
const result = await client.emit('ping');
console.log(result); // 'pong'
```

```javascript
// worker.js
import { WorkerScope } from 'BetterWorker';

const scope = new WorkerScope();

// Worker only registers a single handler for event, if multiple are registered old is overwritten
scope.on('ping', (data) => {
  console.log(data); // {foo:'bar'}
  return 'pong';
});

// default callback is called when no event handler is found, event is the default postMessage event.data
scope.default((data) => {
  console.log('No logic here');
});
```
