export class ReactiveView extends HTMLElement {
  constructor() {
    super();
    this.dataSource = undefined;
    this.memo = {};
  }

  setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.render();
  }

  _validateDataSource() {
    if (!this.dataSource) {
      throw new Error(
        `Datasource in <reactive-view id="${this.id}"> is of type "${typeof this
          .dataSource}" with value of "${this.dataSource}". Nothing to render.`
      );
    }
  }

  _validateDataKey(key) {
    this._validateDataSource();

    const [main, sub] = key.split('::');

    const exists = sub
      ? main in this.dataSource && sub in this.dataSource[main]
      : main in this.dataSource;

    if (!exists) {
      throw new Error(
        `Key "${key}" is not included in datasource for <reactive-view id="${this.id}">`
      );
    }
  }

  updateSingeDataSource(key, value) {
    this._validateDataSource();
    this._validateDataKey(key);

    const [main, sub] = key.split('::');

    if (sub) {
      this.dataSource[main][sub] = value;
    } else {
      this.dataSource[main] = value;
    }

    const boundChildNodes = this.memo[key];
    this._dataBind(boundChildNodes, key);
  }

  _dataBind(children, key) {
    this._validateDataSource();

    if (key) {
      this._validateDataKey(key);
    }

    for (let i = 0; i < children.length; i++) {
      const childNode = children[i];
      const dataSet = childNode.dataset;

      for (const propertyKey in dataSet) {
        const dataKey = dataSet[propertyKey];
        this._validateDataKey(dataKey);

        let dataValue = this.dataSource;
        const dataPath = dataKey.split('::');

        // @TODO you're better than this
        for (let p of dataPath) {
          dataValue = dataValue[p];
        }

        // @TODO smarted way to split properties
        const [mainKey, subKey] = propertyKey.split('::');
        const existingValue = subKey
          ? childNode[mainKey][subKey]
          : childNode[mainKey];

        // @FIX ME doesn't work with classList
        if (existingValue !== dataValue) {
          if (subKey) {
            childNode[mainKey][subKey] = dataValue;
          } else {
            childNode[mainKey] = dataValue;
          }
        } else {
          console.warn(
            `Skipping update for ${propertyKey} as its value hasn't changed`
          );
        }

        if (dataKey in this.memo) {
          const childBoundToMemo = this.memo[dataKey].indexOf(childNode) > -1;
          if (!childBoundToMemo) {
            this.memo[dataKey].push(childNode);
          }
        } else {
          this.memo[dataKey] = [childNode];
        }
      }
    }
  }

  render() {
    console.time(`Render time for <rective-view id="${this.id}"> was`);
    console.log(
      `%c🚀 Rendering "${this.constructor.name}" component`,
      'background-color:#1aa87d; padding: 4px;'
    );

    const [template, ...children] = this.children;
    const templateClone = template.content.cloneNode(true);

    // if no children exept the template create body from template
    if (!children.length) {
      this._dataBind(templateClone.children);
      this.appendChild(templateClone);
    } else {
      // else just update the template
      console.log(children);
      this._dataBind(children);
    }

    console.log(this.memo);
    console.timeEnd(`Render time for <rective-view id="${this.id}"> was`);
  }
}

customElements.define('reactive-view', ReactiveView);
