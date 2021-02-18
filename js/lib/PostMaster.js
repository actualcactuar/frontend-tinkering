class Courier {
    onMessage(callback) {
        self.onmessage = async ({ ports, data }) => {
            const [port] = ports;
            const result = await callback.call(self, data);
            port.postMessage(result);
        }
    }
}

export default class PostMaster {
    constructor(worker) {
        this.worker = worker;
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

    static Courier = Courier
}
