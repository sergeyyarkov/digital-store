import { Component } from "../core/component";

export class CartComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        const btnOpen = document.querySelector('#cartOpen');
        const btnClose = this.$el.querySelector('#cartClose');

        btnOpen.addEventListener('click', openHandler.bind(this));
        btnClose.addEventListener('click', closeHandler.bind(this));
    }
}

function openHandler() {
    this.show();
}

function closeHandler() {
    this.hide();
}