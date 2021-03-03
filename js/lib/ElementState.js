import { State } from '/js/lib/State.js';

export class ElementState extends State {
    constructor(selector, state) {
        super(state)
        this.nodeList = document.querySelectorAll(selector);
        this.render();
        this.subscribe(this.render.bind(this));
        return this;
    }

    render() {
        this.nodeList.forEach(element => {
            for (const entry of Object.entries(element.dataset)) {
                const [attr, key] = entry;

                const value = key.match('::') && key.split('::').reduce((acc, curr) => acc && acc[curr] || this.get(curr), null) || this.get(key)
                console.log({value})
                if (value) {
                    element[attr] = value;
                }
            }
        })
    }

    on(event, callback) {
        this.nodeList.forEach(element => {
            element.addEventListener(event, callback)
        })
    }

    off(event, callback) {
        this.nodeList.forEach(element => {
            element.removeEventListener(event, callback)
        })
    }
}
