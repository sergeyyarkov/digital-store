import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {pagination}) {
        super(id);
        this.pagination = pagination;
    }

    async init() {
        const items = await apiService.getItems();
        this.$table = this.$el.querySelector('table tbody'); 
        this.pagination.initialize(items.length, this.$table, this.getItemsByPage);
    }
    
    async getItemsByPage(page) {
        const items = await apiService.getItemsOffset(page), 
            categories = await apiService.getCategories();
        return renderItems(items, categories);
    }
}