import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";
import { renderCategories } from "../templates/categories.template";

export class ItemsComponent extends Component {
    constructor(id, {pagination}, {search}) {
        super(id);
        this.pagination = pagination;
        this.search = search;
    }

    setElems() {
        this.$categories = this.$el.querySelector('#selectCategories');
    }

    async init() {
        const items = await apiService.getItems(),
            categories = await apiService.getCategories();

        this.$table = this.$el.querySelector('table tbody'); 
        this.search.initialize(this.$table, this.getItemsByText);
        this.pagination.initialize(items.length, this.$table, this.getItemsByPage);
        this.$categories.insertAdjacentHTML('beforeend', renderCategories(categories));
        M.FormSelect.init(this.$categories);
    }

    async getItemsByText(text) {
        const items = await apiService.getItemsQuery(text),
            categories = await apiService.getCategories(),
            data = await apiService.getItemsData();
        return renderItems(items, categories, data);
    }
    
    async getItemsByPage(page) {
        const items = await apiService.getItemsOffset(page), 
            categories = await apiService.getCategories(),
            data = await apiService.getItemsData();
        return renderItems(items, categories, data);
    }
}