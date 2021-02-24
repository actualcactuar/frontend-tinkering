export class State {
    constructor(value) {
        this.value = value;
        this.subscriptions = new Set();
    }

    set(value) {
        this.value = typeof value === 'function' ? value(this.value) : value;
        this.subscriptions.forEach(callback => typeof callback === 'function' && callback(this.value))
    }

    get(key){
       if(key) return key && this.value[key] || null;
       return this.value;
    }
    
    append(value){
        if (!(typeof value === 'object') || !(typeof this.value === 'object')) {
            console.warn(`State and value need to be spreadable in order to append`);
        }
        const newValue = this.value = typeof value === 'function' ? value(this.value) : value;
        this.value = {...this.value, ...newValue};
        this.subscriptions.forEach(callback => typeof callback === 'function' && callback(this.value, value))
    }

    unsubscribe(callback) {
        this.subscriptions.delete(callback);
    }

    subscribe(callback) {
        this.subscriptions.add(callback);
    }
}