import { Component } from '/js/lib/Component.js';

export class Proto extends Component {
    
    useState() {
        return {
            foo: 'bar',
            test: 'asd',
            button: 'button label!',
            objectValue: { foo: 'babababaaa' },
            inputValue: "",
            list: [{ val: "one" }, "two", "three"],
        }
    }

    onRender() {
        this.appendState({ elem: this.querySelector("#target") })
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