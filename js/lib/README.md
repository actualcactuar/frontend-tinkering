# ReactiveAsyncWorker

Wrapper for browsers `postMessage` API for communicating with other entities.

### How to

```javascript
// client.js

import ReactiveAsyncWorker from 'ReactiveAsyncWorker';
const worker = new Worker('worker.js', { type: 'module' });
const client = new ReactiveAsyncWorker(worker);

// emit event with payload to worker
client.emit('ping', { foo: 'bar' });

// you can subsribe from multiple places for the event ocurances
client.subscirbe('ping', (result) => {
  console.log(result); // 'pong'
});

// emit is actually a promise, so you can wait until your event handler is done
const result = await client.emit('ping');
console.log(result); // 'pong'
```

```javascript
// worker.js
import { Messenger } from 'ReactiveAsyncWorker';

const messenger = new Messenger();

// Worker only registers a single handler for event, if multiple are registered old is overwritten
messenger.on('ping', (data) => {
  console.log(data); // {foo:'bar'}
  return 'pong';
});

// default callback is called when no event handler is found, event is the default postMessage event.data
messenger.default((data) => {
    console.log('No logic here')
});
```
