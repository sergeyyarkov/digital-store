import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {pagination}, {search}) {
        super(id);
        this.pagination = pagination;
        this.search = search;
    }

    async init() {
        const items = await apiService.getItems();
        this.$table = this.$el.querySelector('table tbody'); 
        this.search.initialize(this.$table, this.getItemsByText);
        this.pagination.initialize(items.length, this.$table, this.getItemsByPage);
    }

    async getItemsByText(text) {
        const items = await apiService.getItemsQuery(text),
            categories = await apiService.getCategories();
        return renderItems(items, categories);
    }
    
    async getItemsByPage(page) {
        const items = await apiService.getItemsOffset(page), 
            categories = await apiService.getCategories();
        return renderItems(items, categories);
    }
}