import { State } from './State.js';

export class Component extends HTMLElement {
    constructor() {
        super();
        this.useTemplate();
    }

    useState(value) {
        this.state = new State(value);
        this.state.subscribe(this.render.bind(this));
        return this.state;
    }

    useTemplate() {
        const [template] = this.getElementsByTagName('template');
        this.template = template;
    }

    render() {
        if (!this.template || !this.state) {
            throw new Error("Template and sate are required for render");
        };

        const templateClone = this.template.content.cloneNode(true);

        templateClone.querySelectorAll(`[data-bind]`).forEach(elem => {
            const { bind } = elem.dataset;
            console.log(elem.dataset)
            const [attr, key] = bind.split('::').map(slice => slice.trim());
            elem[attr] = this.state && this.state.value[key] || `WARNING: Unbound key "${key}"`;
        })

        
        templateClone.querySelectorAll(`[data-action]`).forEach(elem => {
            const { action } = elem.dataset;
            const [attr, key] = action.split('::').map(slice => slice.trim());
            elem[attr] = this[key].bind(this) || console.warn(`WARNING: Unbound key "${key}"`);
        })

        const [, ...elements] = this.children;
        elements.forEach(child => this.removeChild(child));
        this.appendChild(templateClone);
    }
}

