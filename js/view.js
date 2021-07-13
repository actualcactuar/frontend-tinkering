import { WorkerScope } from '/js/lib/BetterWorker.js';

const scope = new WorkerScope();

scope.default((data) => {
  return 'reached default message handler';
});

scope.task('foo', () => {
  return 'piupau';
});
