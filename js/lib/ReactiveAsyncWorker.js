
export class Messenger {
    constructor() {
        this.subscriptions = new Map();
        self.onmessage = async ({ ports, data }) => {
            const [port] = ports;
            const { event, payload, kind } = data;

            if (!event && !kind) {
                const result = this.default && await this.default.call(self, data);
                port.postMessage(result);
                return;
            }

            const callback = this.subscriptions.get(event);
            const result = await callback(payload);
            port.postMessage(result);
        }
    }

    on(event, callback) {
        if(this.subscriptions.has(event)){
            console.warn(`Overwriting existing eventhandler for ${event}. Hope you know what you're doing.`)
        }
        this.subscriptions.set(event, callback)
    }

    default(callback) {
        this.default = callback;
    }
}

export default class ReactiveAsyncWorker {
    constructor(worker) {
        this.worker = worker;
        this.subscriptions = new Map()
    }

    post(payload) {
        return new Promise((resolve, reject) => {
            const { port1, port2 } = new MessageChannel();
            this.worker.postMessage(payload, [port2]);
            port1.onmessage = responsePayload => {
                port1.close();
                resolve(responsePayload.data);
            }
            port1.onmessageerror = reject;
        })
    }

    subscribe(event, callback) {
        const eventSubcribers = this.subscriptions.get(event) || new Set();
        if (!this.subscriptions.has(event)) this.subscriptions.set(event, eventSubcribers)
        eventSubcribers.add(callback);
    }

    async emit(event, payload) {
        const result = await this.post({ event, payload, kind: 'emit' });
        const eventSubcribers = this.subscriptions.get(event);
        if (!eventSubcribers) return result;
        eventSubcribers.forEach(callback => callback.call(null, result));
        return result
    }
}
