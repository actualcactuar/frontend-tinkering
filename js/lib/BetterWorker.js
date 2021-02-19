import EventEmitter from '/js/lib/EventEmitter.js'

export class WorkerScope {
    constructor(){
        this.tasks = new Map();
        self.onmessage = async ({ ports, data }) => {
            const [port] = ports;
            const { event, payload } = data;

            if (!event) {
                const result = this.default && await this.default.call(self, data);
                port.postMessage(result);
                return;
            }

            const callback = this.tasks.get(event);
            if(!callback){
                console.warn(`No task specified for "${event}"`)
                port.postMessage(null);
                return;
            }
            const result = await callback(payload);
            port.postMessage(result);
        }
    }

    task(task, callback){
        if(this.tasks.has(task)){
            console.warn('overwriting existing actions');
        }
        this.tasks.set(task, callback)
    }

    default(callback) {
        this.default = callback;
    }
}

export class ClientScope extends EventEmitter {
    constructor(filepath, options) {
        super();
        this.worker = new Worker(filepath, options);
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

    async execute(event, payload) {
        const result = await this.post({ event, payload });
        console.log({event, result});
        this.emit(event, result);
        return result;
    }

}