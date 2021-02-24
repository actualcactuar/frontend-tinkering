import { Component } from '/js/lib/Component.js';

export class Proto extends Component {

    useState() {
        return {
            foo: 'bar',
            test: 'asd',
            button: 'button label!',
            objectValue: { foo: 'babababaaa' },
            inputValue: "asd",
            list: [{ val: "one" }, "two", "three"],
            labelName: "label!",
            testClassList: () => "foo",
        }
    }

    useObservers() {
        return {
            inputValue: (value) => {
                const testClassList = value ? 'JEE' : 'NOOO';
                return { testClassList }
            }
        }
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