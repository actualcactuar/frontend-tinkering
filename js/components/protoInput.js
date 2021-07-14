import { Component } from '../lib/Component.js';

export class ProtoInput extends Component {
  // initial state for input
  useState() {
    return {
      inputValue: '',
      classNames: 'base-class',
    };
  }

  // state values to obseve and react to
  useObservers() {
    return {
      inputValue: (value) => {
        const classNames = value ? 'base-class filled' : 'base-class';
        return { classNames };
      },
    };
  }

  // functionality to bind into data-* template
  handleInput(event) {
    this.appendState({ inputValue: event.target.value });
  }
}

customElements.define('proto-input', ProtoInput);
