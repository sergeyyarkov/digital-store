import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    setElems() {
        this.$table = this.$el.querySelector('table tbody');
    }

    async init() { 
        const categories = await apiService.getCategories();
        const items = await apiService.getItems();
        const html = renderItems(items, categories);

        this.$table.insertAdjacentHTML('afterbegin', html);
        this.loader.hide();
    }
}