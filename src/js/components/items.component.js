import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async init() {
        
        if (this.$el) {
            const fData = await apiService.getItems(),
                categories = Object.keys(fData);
            
            if (categories.length) {
                const html = renderItems(categories, fData);
                this.$el.querySelector('#roster').insertAdjacentHTML('afterbegin', html);  
            } else {
                this.$el.querySelector('#roster').innerHTML = 'Товаров на сайте пока что нету';
            }
            this.loader.hide(); 
        }
    }
    
    onHide() {
        this.$el.querySelector('#roster').innerHTML = '';
        this.loader.hide();
    }
    onShow() {
        this.$el.querySelector('#roster').innerHTML = '';
        this.loader.show();
    }
}