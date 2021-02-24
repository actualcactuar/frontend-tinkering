import { State } from './State.js';

export class Component extends HTMLElement {
    constructor() {
        super();
        const [template] = this.getElementsByTagName('template');
        this.template = template;
        this.memo = new Map();
    }

    appendState(value) {
        if (!(typeof value === 'object') || !(typeof this.state === 'object')) {
            console.warn(`State and value need to be spreadable in order to append`);
        }
        this.state.set(state => ({ ...state, ...value }));
        this.updateRender(value);
    }

    initState(value) {
        this.state = new State(value);
        this.render();
        // this.state.subscribe(this.render.bind(this));
    }

    updateRender(change) {
        console.log(`%c🚀 Updating "${this.constructor.name}" component values "${Object.keys(change)}"`,'background-color:#1aa87d; padding: 4px;')
        const { memo } = this;
        for (const [key, value] of Object.entries(change)) {
            if (memo.has(key)) {
                const node = memo.get(key);
                for (const attr of Object.keys(node.dataset)) {
                    if (node[attr] !== memo.get(key)) {
                        node[attr] = value;
                    }
                }
            } else {
                console.warn(`UPDATE FAILED on value ${key}, reverting to render`)
                this.render();
                break;
            }
        }

    }


    render() {
        console.log(`%c🚀 Rendering "${this.constructor.name}" component`,'background-color:#1aa87d; padding: 4px;')
        const { template, state, memo } = this;
        if (!template || !state) {
            throw new Error("Template and sate are required for render");
        };

        const templateClone = template.content.cloneNode(true);

        const bindTemplateDatasets = (childElementHtmlCollection) => {
            for (const childNode of childElementHtmlCollection) {
                // console.log(childNode, childNode.dataset)
                for (const [attr, key] of Object.entries(childNode.dataset)) {
                    // console.log(attr, childNode[attr], this[key], this.state.get(key))

                    if (this[key] || key in state.get()) {
                        if (typeof this[key] === 'function') { // look for eventhandler in components class methods
                            if (!memo.has(key)) {
                                memo.set(key, this[key].bind(this));
                            }
                            if (childNode[attr] !== memo.get(key)) {
                                childNode[attr] = memo.get(key);
                            }
                        } else { // use components state
                            if (!memo.has(key)) {
                                memo.set(key, childNode);
                            }
                            if (childNode[attr] !== state.get(key)) {
                                childNode[attr] = state.get(key);

                            }
                        }
                    } else if (key.match('::')) {
                        const keys = key.split('::');
                        const data = keys.reduce((acc, curr) => acc && acc[curr] || state.get(curr), null);
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

