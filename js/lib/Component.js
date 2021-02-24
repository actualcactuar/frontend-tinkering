import { State } from './State.js';

export class Component extends HTMLElement {
    constructor() {
        super();
        const [template] = this.getElementsByTagName('template');
        this.template = template;
        this.memo = new Map();
    }

    appendState(value) {
        this.state.append(value);

    }

    updateRender(change) {
        console.log(`%c🚀 Updating "${this.constructor.name}" component values "${Object.keys(change)}"`, 'background-color:#1aa87d; padding: 4px;')
        const { memo } = this;
        for (const [key, value] of Object.entries(change)) {
            if (memo.has(key)) {
                const set = memo.get(key);
                for (const node of set) {
                    for (const [attrKey, attrVal] of Object.entries(node.dataset)) {
                        if (attrVal === key && node[attrKey] !== value) {
                            node[attrKey] = value;
                        }
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
        console.log(`%c🚀 Rendering "${this.constructor.name}" component`, 'background-color:#1aa87d; padding: 4px;')
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
                                const set = new Set().add(childNode);
                                memo.set(key, set);
                            } else {
                                memo.get(key).add(childNode);
                            }

                            const value = typeof state.get(key) === 'function' ? state.get(key).call(this) : state.get(key);
                            if (childNode[attr] !== value) {
                                childNode[attr] = value;
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

    init() {
        const state = this.useState && this.useState() || {};
        this.state = new State(state);
        // initial render
        this.render();
        // subscribe for updates
        this.state.subscribe(this.updateRender.bind(this));
    }

    // render on mount
    connectedCallback() {
        this.init();
    }
}

