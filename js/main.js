import { ClientScope } from '/js/lib/BetterWorker.js';
import { StatefulElement } from '/js/lib/StatefulElement.js';

const view = new ClientScope('js/worker.js', { type: 'module' });

view.execute('foo').then((result) => console.log({ result }));

view.on('foo', (data) => {
  console.log({ data });
});

const selector = '.bindme';
const initalState = { foo: { bar: 'nested state' }, asd: 'test' };
const estate = new StatefulElement(selector, initalState);

estate.append({
  fiu: 'piu',
  handleClick() {
    console.log('click!');
    estate.append({ foo: { bar: 'asdasd' }, bar: 'awidojogifa' });
  },
});