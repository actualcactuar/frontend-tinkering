import { Component } from '/js/lib/Component.js';

export class ProtoList extends Component {
  // initial state for input
  useState() {
    return {
      list: ['one', 'two', 'three'],
    };
  }
}

customElements.define('proto-list', ProtoList);
