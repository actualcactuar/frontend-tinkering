import { Component } from '/js/lib/Component.js'

export class Proto extends Component {
    constructor() {
        super();
        this.useState({ foo: 'bar', test: 'asd', button: 'button label!' });
    }

    handleClick() {
        console.log('CLICK')
        this.state.set(state => ({ ...state, foo: 'test', button: 'update label!' }));
    }

    handleInput(event) {
        this.appendState({ inputValue: event.target.value });
    }

}

customElements.define('proto-elem', Proto);