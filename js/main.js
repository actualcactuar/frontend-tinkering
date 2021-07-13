import { ClientScope } from '/js/lib/BetterWorker.js';
import { StatefulElement } from '/js/lib/StatefulElement.js';

const workerButton = document.getElementById('workerbutton');
const view = new ClientScope('js/worker.js', { type: 'module' });

workerButton.onclick = () => {
  view.execute('ping');
};

view.on('ping', (responseMessage) => {
  alert(`Worker says "${responseMessage}"`);
});
