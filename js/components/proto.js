import { Component } from '/js/lib/Component.js'

export class Proto extends Component {
    constructor() {
        super();
        this.useState({ foo: 'bar', test: 'asd', button: 'button label!' });
    }

    handleClick() {
        this.state.set(state => ({ ...state, foo: 'test', button: 'update label!' }));
    }

}

customElements.define('proto-elem', Proto);