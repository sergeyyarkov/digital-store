import { Component } from "../core/component";
import { insertCount } from "../other/counter";

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if (this.$el) {
            const currentPage = this.$el.querySelector('#desktop-nav');
            const pages = Array.from(this.$el.querySelectorAll('#page'));
            pages.forEach(li => li.dataset.page === currentPage.dataset.current ? li.classList.add('active') : false);
            // ф-я счетика товаров
            localStorage.getItem('cart') ? insertCount('counter', JSON.parse(localStorage.getItem('cart'))) : false;
        }
    }
}