import { Component } from '/js/lib/Component.js';

export class Proto extends Component {
    constructor() {
        super();
        this.initState({ foo: 'bar', test: 'asd', button: 'button label!', objectValue: { foo: 'babababaaa' }, inputValue: "" });
    }

    handleClick() {
        console.log('CLICK')
        this.appendState({ foo: 'test', button: 'update label!' });
    }

    handleInput(event) {
        this.appendState({ inputValue: event.target.value });
    }

}

customElements.define('proto-elem', Proto);