export default class EventEmitter {
  constructor() {
    this.subscriptions = new Map();
  }

  on(event, callback) {
    const eventCallbacks = this.subscriptions.get(event) || new Set();
    if (!this.subscriptions.has(event))
      this.subscriptions.set(event, eventCallbacks);
    eventCallbacks.add(callback);
  }

  off(event, callback) {
    const eventCallbacks = this.subscriptions.get(event);
    if (!eventCallbacks) return;
    this.subscriptions.delete(callback);
  }

  emit(event, ...args) {
    if (!this.subscriptions.has(event)) return;
    this.subscriptions.get(event).forEach((callback) => callback(...args));
  }

  static once(target, event) {
    return new Promise((resolve) => {
      target[event] = resolve;
    });
  }
}
