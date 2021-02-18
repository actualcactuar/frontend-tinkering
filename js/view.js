import { Messenger } from '/js/lib/ReactiveAsyncWorker.js'

const messenger = new Messenger();

messenger.default((data) => {
    return "reached default message handler"
})

messenger.on('foo', () => {
    return 'piupau'
})

messenger.on('share', (buffer) => {
    const int32 = new Int32Array(buffer);
    Atomics.wait(int32,0,5);
    console.log(int32)
})
console.log('hello from view!');
