class ButtonCount extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const buttonIcon = document.createElement('button');

        this.counter = 0;

        buttonIcon.innerText = `Times Clicked: ${this.counter}`;

        buttonIcon.addEventListener('click', () => {
            this.counter++;
            this.buttonClicked();
        });

        shadow.appendChild(buttonIcon);

    }

    buttonClicked () {
        const button = this.shadowRoot.querySelector('button');
        button.innerText = `Times Clicked: ${this.counter}`;
    }
    

}

customElements.define('button-count', ButtonCount);