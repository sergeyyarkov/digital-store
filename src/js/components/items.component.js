import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { renderItems } from "../templates/items.template";

export class ItemsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
        this.$el ? this.roster = this.$el.querySelector('#roster') : false;
    }

    async init() {
        if (this.$el) {
            localStorage.setItem('sortByAll', 'true'); // установка значения для компонента Filter
            if (!localStorage.getItem('category')) { // Получаем все товары и выводим их если нету ключа category в ls
               const fData = await apiService.getItems(),
                categories = Object.keys(fData);
            
                if (categories.length) {
                    const html = renderItems(categories, fData);
                    this.insertItems(html);
                } else {
                    this.roster.innerHTML = 'Товаров на сайте пока что нету';
                }
                
                this.loader.hide(); 
            } 
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

    insertItems(html) {
        this.roster.insertAdjacentHTML('afterbegin', html);
    }
}