import { State } from './State.js';

export class Component extends HTMLElement {
    constructor() {
        super();
        const [template] = this.getElementsByTagName('template');
        this.template = template;
        this.memo = new Map();
    }

    setState(value) {
        this.state.set(value);
    }

    appendState(value) {
        if (!(typeof value === 'object') || !(typeof this.state === 'object')) {
            console.warn(`State and value need to be spreadable in order to append`);
        }
        this.state.set(state => ({ ...state, ...value }))
    }

    initState(value) {
        this.state = new State(value);
        this.state.subscribe(this.render.bind(this));
    }

    render() {
        if (!this.template || !this.state) {
            throw new Error("Template and sate are required for render");
        };

        console.log(this.state)
        const templateClone = this.template.content.cloneNode(true);

        const bindTemplateDatasets = (childElementHtmlCollection) => {
            for (const childNode of childElementHtmlCollection) {
                // console.log(childNode, childNode.dataset)
                for (const [attr, key] of Object.entries(childNode.dataset)) {
                    // console.log(attr, childNode[attr], this[key], this.state.get(key))
                    
                    if (this[key] || this.state.get(key)) {
                        if (typeof this[key] === 'function') { // look for eventhandler in components class methods
                            if (!this.memo.has(key)) {
                                this.memo.set(key, this[key].bind(this));
                            }
                            if (childNode[attr] !== this.memo.get(key)) {
                                console.log({ attr, key });
                                childNode[attr] = this.memo.get(key);
                            }
                        } else { // use components state
                            if (childNode[attr] !== this.state.get(key)) {
                                console.log({ attr, key });
                                childNode[attr] = this.state.get(key);

                            }
                        }
                    } else if (key.match('::')) {
                        const keys = key.split('::');
                        const data = keys.reduce((acc, curr) => acc && acc[curr] || this.state.get(curr), null);
                        if (data && typeof data !== 'object' && childNode[attr] !== data) {
                            childNode[attr] = data;
                        }
                    }


                }
                if (childNode.children.length) {
                    bindTemplateDatasets(childNode.children);
                }
            }

        }


        const [, ...children] = this.children;
        if (!children.length) {
            bindTemplateDatasets(templateClone.children)
            this.appendChild(templateClone);
        } else {
            bindTemplateDatasets(children)
        }
    }
}

