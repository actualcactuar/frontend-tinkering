import { Messenger } from '/js/lib/ReactiveAsyncWorker.js'

const messenger = new Messenger();

messenger.default((data) => {
    return "reached default message handler"
})

messenger.on('foo', () => {
    return 'piupau'
})


console.log('hello from view!');
