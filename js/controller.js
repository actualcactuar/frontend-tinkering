import ReactiveAsyncWorker from '/js/lib/ReactiveAsyncWorker.js'

const model = new Worker('js/model.js', { type: 'module' });
const view = new Worker('js/view.js', { type: 'module' });

const client = new ReactiveAsyncWorker(view);


client.subscribe('foo', (data) => { console.log('bar', { data }) });
client.emit('foo', { fizz: "buzz" })

const buffer = new SharedArrayBuffer(1024);
client.emit('share', buffer);

const int32 = new Int32Array(buffer); 
Atomics.store(int32,0, 123);
Atomics.notify(int32,0, 1);