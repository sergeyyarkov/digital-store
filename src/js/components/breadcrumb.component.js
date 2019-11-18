import { Component } from "../core/component";

export class BreadcrumbComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if(this.$el) {
            const btn = this.$el.querySelector('#breadcrumbBtn');
            btn.addEventListener('click', buttonHandler);
        }
    }
}

function buttonHandler(e) {
    e.preventDefault();
    if (e.target.dataset.category) {
        localStorage.setItem('category', e.target.dataset.category.toLowerCase());
        window.location.href = '/';
    }
}