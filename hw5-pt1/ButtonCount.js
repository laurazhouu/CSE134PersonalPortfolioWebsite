const bt = document.createElement('template');
bt.innerHTML = `
    <button>Times Clicked: 0</button>
`;

class ButtonCount extends HTMLElement {
    count = 0;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(bt.content.cloneNode(true));
    }

    connectedCallback() {
        const button = this._shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            this.count++;
            button.innerHTML = 'Times Clicked: ' + this.count;
        });
    }
}

customElements.define('button-count', ButtonCount);