import { ClientScope } from './lib/BetterWorker.js';
import { StatefulElement } from './lib/StatefulElement.js';

const workerButton = document.getElementById('workerbutton');
const view = new ClientScope('js/worker.js', { type: 'module' });

workerButton.onclick = () => {
  view.execute('ping');
};

view.on('ping', (responseMessage) => {
  alert(`Worker says "${responseMessage}"`);
});
