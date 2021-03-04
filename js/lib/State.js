export class State {
    constructor(value) {
        this.value = value;
        this.subscriptions = new Set();
        this.observers = new Map();
    }

    set(value) {
        this.value = typeof value === 'function' ? value(this.value) : value;
        this.subscriptions.forEach(callback => typeof callback === 'function' && callback(this.value))
    }

    get(key) {
        if (key) return key && this.value[key] || null;
        return this.value;
    }

    append(value) {
        if (!(typeof value === 'object') || !(typeof this.value === 'object')) {
            console.warn(`State and value need to be spreadable in order to append`);
        }
        const newValue = typeof value === 'function' ? value(this.value) : value;
        this.value = { ...this.value, ...newValue };

        Object.keys(newValue).forEach((key) => {
            if (this.observers.has(key)) {
                for (const observer of this.observers.get(key)) {
                    const observerReturnValue = observer(this.value[key]);
                    if (typeof observerReturnValue === 'object') {
                        this.value = { ...this.value, ...observerReturnValue }
                    }
                }
            }
        })
        this.subscriptions.forEach(callback => typeof callback === 'function' && callback(this.value, value));
        console.log(this.value)
    }

    observe(key, callback) {
        if (!this.observers.has(key)) {
            this.observers.set(key, new Set())
        }
        this.observers.get(key).add(callback);
    }

    unsubscribe(callback) {
        this.subscriptions.delete(callback);
    }

    subscribe(callback) {
        this.subscriptions.add(callback);
    }
}