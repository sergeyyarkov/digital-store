import { Component } from "../core/component";
import { apiService } from "../services/api.service";

export class DashboardComponent extends Component {
    constructor(id, {pagination}, {search}) {
        super(id);
        this.pagination = pagination;
        this.search = search;
    }

    init() {
        this.$table = this.$el.querySelector('table tbody');
        this.getBuyersByPage(1);
    }

    async getBuyersByPage(page) {
        const buyers = await apiService.getBuyersOffset(page);
        console.log(buyers);
        // рендерим дальше
    }
}