import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async init() {
        const items = await apiService.getItemsOffset(1, 5), 
            categories = await apiService.getCategories(),
            html = renderItems(items, categories);

        this.$table = this.$el.querySelector('table tbody');
        this.$table.insertAdjacentHTML('afterbegin', html);
        this.onHide();
    }

    onHide() {
        this.loader.hide();
    }

    onShow() {
        this.loader.show();
        this.$table.innerHTML = '';
    }

    async insertItems(page, limit) {
        const items = await apiService.getItemsOffset(page, limit), 
            categories = await apiService.getCategories(),
            html = renderItems(items, categories);

        this.$table.insertAdjacentHTML('afterbegin', html);
    }
}