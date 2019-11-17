import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItemsOne } from "../templates/itemsOne.template";
import { renderItems } from "../templates/items.template";

export class CategoryComponent extends Component {
    constructor(id, {items}) {
        super(id);
        this.items = items;
    }

    init() {
        if (this.$el) {
            this.$el.addEventListener('click', buttonHandler.bind(this));
        }
    }
}

async function buttonHandler(e) {
    e.preventDefault();
    if (e.target.dataset.category && e.target.dataset.category != 'all') {
        this.items.onShow();
        const category = e.target.dataset.category.toLowerCase();
        const fData = await apiService.getItemsOne(category);
        const html = renderItemsOne(category, fData);
        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    } else if (e.target.dataset.category === 'all') {
        this.items.onShow();
        const fData = await apiService.getItems(),
                categories = Object.keys(fData);

        const html = renderItems(categories, fData);
        this.items.onHide();
        document.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
    }
}