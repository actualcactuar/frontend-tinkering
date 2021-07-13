# Component

Wrapper for Custom Elements API implementing state and render functinalities to component.

## Input example

Input value bind to update classlist based on value

```html
<proto-input>
  <template>
    <input data-oninput="handleInput" />
    <p>Input value is: <span data-inner-text="inputValue"></span></p>
  </template>
</proto-input>
```

```javascript
import { Component } from '/js/lib/Component.js';

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
```

## List example
