import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderBuyers } from "../templates/buyers.template";

export class DashboardComponent extends Component {
    constructor(id, {pagination}, {search}) {
        super(id);
        this.pagination = pagination;
        this.search = search;
    }

    async init() {
        const buyers = await apiService.getBuyers();
        this.$table = this.$el.querySelector('table tbody');
        this.search.initialize(this.$table, this.getBuyersByBillId);
        this.pagination.initialize(buyers.length, this.$table, this.getBuyersByPage);
    }

    async getBuyersByBillId(bill_id) {
        const buyer = await apiService.getBillId(bill_id);
        return renderBuyers(buyer);
    }

    async getBuyersByPage(page) {
        const buyers = await apiService.getBuyersOffset(page);
        return renderBuyers(buyers);
    }
}