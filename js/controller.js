import { ClientScope } from '/js/lib/BetterWorker.js'
import { State } from '/js/lib/State.js'
import { ElementState } from '/js/lib/ElementState.js';

const model = new ClientScope('js/model.js', { type: 'module' });
const view = new ClientScope('js/view.js', { type: 'module' });

view.execute('foo').then(result => console.log({ result }))

view.on('foo', (data) => {
    console.log({ data })
});

const state = new State("asd");
state.subscribe(value => {
    console.log('STATE VALUE', value);
})
state.set("foo");
state.set(value => value.concat("asdasdasd"))


const estate = new ElementState('.bindme', { foo: { bar: 'nested state' }, asd: 'test' });
console.log(estate)
estate.set({ foo: 'bar', asd: 'test' });
estate.on('click', (event) => {
    console.log({ event });
    estate.set({ foo: 'adwijjoiawiofaf', bar: 'awidojogifa' })
})
console.log({ estate })