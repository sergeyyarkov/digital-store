import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class FilterComponent extends Component {
    constructor(id, {items}) {
        super(id);
        this.items = items;
    }

    init() {
        if (this.$el) {
            this.$el.addEventListener('click', sortByAllHandler.bind(this));
            this.$el.addEventListener('click', sortByOneHandler.bind(this));
        }
    }

    clearChecked() {
        if (this.$el) {
            const options = this.$el.querySelectorAll('.filter-options form input');
            Array.from(options).forEach(option => option.checked = false);
        }
    }
}

async function sortByAllHandler(e) {
    if (localStorage.getItem('sortByAll')) {
        if (e.target.id) {
            const sorting = e.target.id;
            
            this.items.onShow();
            const fData = await apiService.getItems(sorting);
            const categories = await apiService.getCategories();
            const html = renderItems(categories, fData);

            this.items.onHide();
            this.items.insertItems(html);
        }
    }
}

async function sortByOneHandler(e) {
    if (!localStorage.getItem('sortByAll')) {
        if (e.target.id) {
            const sorting = e.target.id;
            this.items.onShow();

        const category = await apiService.getCategory(localStorage.getItem('currentCategory')),
            fData = await apiService.getItemsOne(localStorage.getItem('currentCategory'), sorting),
            html = renderItems(category, fData);

            this.items.onHide();
            this.items.insertItems(html);
        }
    }
}