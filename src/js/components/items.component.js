import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItem } from "../templates/item.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
        this.loader.show();
    }

    async init() {
        
        if (this.$el) {
            const fData = await apiService.getItems(),
                items = fData[0].items,
                categories = Object.keys(items);
            
            const html = renderItem(categories, items);
            this.$el.querySelector('#roster').insertAdjacentHTML('afterbegin', html);
            this.loader.hide();
        }
    }   
}