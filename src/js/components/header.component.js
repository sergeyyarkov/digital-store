import { Component } from "../core/component";

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        const currentPage = this.$el.querySelector('#desktop-nav');
        const pages = Array.from(this.$el.querySelectorAll('#page'));
        pages.forEach(li => li.dataset.page === currentPage.dataset.current ? li.classList.add('active') : false);
    }
}