export class PostMaster {
    constructor(worker){
        this.worker = worker;
    }

    post (payload) {
        return new Promise((resolve, reject) => {
            const channel = new MessageChannel();
            this.worker.postMessage(payload, [channel.port2]);
            channel.port1.onmessage = payload =>  {
                channel.port1.close();
                resolve(payload.data);
            }
            channel.port1.onmessageerror = reject;
        })
    }
}

export class Courier {
    onMessage (callback) {
        self.onmessage = async payload => {
            const result = await callback.call(self, payload.data);
            payload.ports[0].postMessage(result);
        }
    }
}