import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async init() {
        const html = await this.getItemsByPage(1);
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

    async insertItems(page) {
        const html = await this.getItemsByPage(page);
        this.$table.insertAdjacentHTML('afterbegin', html);
    }
    
    async getItemsByPage(page) {
        const items = await apiService.getItemsOffset(page), 
            categories = await apiService.getCategories();
        return renderItems(items, categories);
    } 
}