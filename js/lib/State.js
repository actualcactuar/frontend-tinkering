export class State {
    constructor(value) {
        this.value = value;
        this.subscriptions = new Set();
    }

    set(value) {
        this.value = value;
        this.subscriptions.forEach(callback => callback( this.value))
    }

    unsubscribe(callback) {
        this.subscriptions.delete(callback);
    }

    subscribe(callback) {
        this.subscriptions.add(callback);
        callback(this.value);
    }
}