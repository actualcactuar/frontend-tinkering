import { WorkerScope } from '/js/lib/BetterWorker.js';

const scope = new WorkerScope();

scope.default(() => {
  return 'reached default message handler';
});

scope.task('ping', () => {
  return 'pong';
});
