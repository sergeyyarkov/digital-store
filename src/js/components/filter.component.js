import { Component } from "../core/component";

export class FilterComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if (this.$el) {
            this.$el.addEventListener('click', sortByAllHandler.bind(this));
            this.$el.addEventListener('click', sortByOneHandler.bind(this));
        }
    }
}

function sortByAllHandler(e) {
    if (localStorage.getItem('sortByAll')) {
        if (e.target.id) {
            const sortBy = e.target.id;
            console.log(sortBy, 'By all');
        }
    }
}

function sortByOneHandler(e) {
    if (!localStorage.getItem('sortByAll')) {
        if (e.target.id) {
            const sortBy = e.target.id;
            console.log(sortBy, 'By one');
        }
    }
}