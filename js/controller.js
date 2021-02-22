import { ClientScope } from '/js/lib/BetterWorker.js'
import { State } from '/js/lib/State.js'

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